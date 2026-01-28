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

                const privateKey = process.env.FIREBASE_PRIVATE_KEY;
                const projectId = process.env.FIREBASE_PROJECT_ID;
                const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

                if (!privateKey || !projectId || !clientEmail) {
                    console.error('❌ ERROR: Faltan variables de entorno críticas de Firebase en Railway.');
                    console.error('Asegúrate de tener: FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL');
                    return false;
                }

                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId: projectId,
                        privateKey: privateKey.replace(/\\n/g, '\n'),
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
