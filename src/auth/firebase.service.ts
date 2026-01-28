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

                // 🛠️ LIMPIEZA INTEGRAL DE LA CLAVE (A prueba de balas)
                // 1. Quitar espacios y comillas externas
                let rawKey = privateKey.trim();
                if (rawKey.startsWith('"') && rawKey.endsWith('"')) {
                    rawKey = rawKey.substring(1, rawKey.length - 1);
                }

                // 2. Convertir \n literal (\ y n) a saltos de línea reales
                // y limpiar cualquier espacio residual
                let body = rawKey.replace(/\\n/g, '\n').trim();

                // 3. RECONSTRUCCIÓN PEM ESTÁNDAR
                // Quitamos cualquier cabecera que ya traiga para evitar duplicados
                body = body.replace('-----BEGIN PRIVATE KEY-----', '').replace('-----END PRIVATE KEY-----', '').trim();

                // El formato PEM final DEBE tener saltos de línea reales
                const cleanedKey = `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----`;

                console.log('🔍 Análisis de Clave Privada:');
                console.log(`- Empieza con: "${cleanedKey.substring(0, 30)}..."`);
                console.log(`- Termina con: "...${cleanedKey.substring(cleanedKey.length - 30)}"`);
                console.log(`- Longitud total: ${cleanedKey.length}`);

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
