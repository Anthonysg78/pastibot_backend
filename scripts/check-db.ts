import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const userCount = await prisma.user.count();
    const patientCount = await prisma.patient.count();
    const medicineCount = await prisma.medicine.count();

    console.log(`Users: ${userCount}`);
    console.log(`Patients: ${patientCount}`);
    console.log(`Medicines: ${medicineCount}`);

    if (userCount === 0 && patientCount === 0 && medicineCount === 0) {
        console.log('DATABASE IS CLEAN');
    } else {
        console.log('DATABASE STILL HAS DATA');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
