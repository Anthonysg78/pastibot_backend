import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
    const caregiver = await prisma.user.findFirst({
        where: { role: 'CUIDADOR' }
    });
    console.log('--- DB CHECK ---');
    console.log('Caregiver Email:', caregiver?.email);
    console.log('Sharing Code:', caregiver?.sharingCode);

    const patients = await prisma.patient.findMany();
    console.log('Total Patients:', patients.length);
    patients.forEach(p => console.log(`Patient: ${p.name}, UserID: ${p.userId}`));
    console.log('----------------');
}

check().then(() => process.exit(0));
