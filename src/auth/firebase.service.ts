import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
    onModuleInit() {
        this.ensureInitialized();
    }

    private ensureInitialized() {
        try {
            if (admin.apps.length === 0) {
                console.log('🏗️ Iniciando carga de credenciales de Firebase...');

                let privateKey = process.env.FIREBASE_PRIVATE_KEY;
                const projectId = process.env.FIREBASE_PROJECT_ID;
                const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

                if (!privateKey || !projectId || !clientEmail) {
                    console.error('❌ ERROR: Faltan variables de entorno críticas de Firebase en Railway.');
                    return false;
                }

                // 🛡️ LIMPIEZA INDESTRUCTIBLE DE LA CLAVE
                // 1. Quitar comillas y limpiar espacios externos
                let body = privateKey.replace(/"/g, '').trim();

                // 2. Convertir \n literal a saltos de línea reales
                body = body.replace(/\\n/g, '\n');

                // 3. Quitar cabeceras y pies si existen para limpiar el "cuerpo" base64
                body = body.replace(/-----BEGIN PRIVATE KEY-----/g, '')
                    .replace(/-----END PRIVATE KEY-----/g, '')
                    .trim();

                // 4. QUITAR TODO EL ESPACIO EN BLANCO INTERNO (Saltos de línea, espacios, etc.)
                // Esto nos deja solo el chorro de texto Base64 "puro".
                const pureBase64 = body.replace(/\s+/g, '');

                // 5. Reconstruir el formato PEM exacto (Cabecera + Base64 en una sola línea + Pie)
                const cleanedKey = `-----BEGIN PRIVATE KEY-----\n${pureBase64}\n-----END PRIVATE KEY-----`;

                console.log('🔍 Análisis de Clave Privada (Modo Indestructible):');
                console.log(`- Inicio: ${cleanedKey.substring(0, 40)}...`);
                console.log(`- Longitud del chorro Base64: ${pureBase64.length}`);

                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId: projectId,
                        privateKey: cleanedKey,
                        clientEmail: clientEmail,
                    }),
                });
                console.log('🔥 Firebase Admin inicializado correctamente');
            }
            return true;
        } catch (error) {
            console.error('❌ Error crítico inicializando Firebase Admin:', error);
            return false;
        }
    }

    async createCustomToken(uid: string, additionalClaims?: any): Promise<string> {
        if (!this.ensureInitialized()) {
            throw new Error('Firebase Admin no pudo ser inicializado. Revisa las variables de entorno en Railway.');
        }

        console.log('🔑 Creando Token para:', uid);
        try {
            const token = await admin.auth().createCustomToken(uid, additionalClaims);
            console.log('✅ Token creado');
            return token;
        } catch (error) {
            console.error('❌ Error en createCustomToken:', error);
            throw error;
        }
    }
}
