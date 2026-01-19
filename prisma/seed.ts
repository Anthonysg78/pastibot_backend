import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = 'pastibot2026';
    const hashedPassword = await bcrypt.hash(password, 10);

    const caregiver = await prisma.user.upsert({
        where: { email: 'cuidador@pastibot.com' },
        update: {},
        create: {
            email: 'cuidador@pastibot.com',
            name: 'Cuidador Principal',
            password: hashedPassword,
            role: 'CUIDADOR',
            provider: 'email',
            verified: true,
            gender: 'Masculino',
            bio: 'Cuidador principal del sistema Pastibot.',
            photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pastibot',
            sharingCode: 'PASTIBOT',
        } as any,
    });

    console.log('--- SEED COMPLETADO ---');
    console.log('Usuario Cuidador Creado:');
    console.log(`Email: ${caregiver.email}`);
    console.log(`Password: ${password}`);
    console.log('-----------------------');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
