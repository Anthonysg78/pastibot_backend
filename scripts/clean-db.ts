import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Cleaning database data...');

    // Disable triggers if needed, or just delete in order
    await prisma.dispensationLog.deleteMany();
    await prisma.reminder.deleteMany();
    await prisma.medicine.deleteMany();
    await prisma.invitation.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.passwordReset.deleteMany();
    await prisma.robotLog.deleteMany();
    await prisma.robotState.deleteMany();
    await prisma.user.deleteMany();

    console.log('Database cleaned successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
