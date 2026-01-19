/*
  Warnings:

  - A unique constraint covering the columns `[linkCode]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sharingCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "category" TEXT DEFAULT 'General',
ADD COLUMN     "icon" TEXT DEFAULT 'pill',
ADD COLUMN     "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "instructions" TEXT DEFAULT '',
ADD COLUMN     "slot" INTEGER,
ADD COLUMN     "stockAlert" INTEGER DEFAULT 5;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "linkCode" TEXT,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sharingCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_linkCode_key" ON "Patient"("linkCode");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_sharingCode_key" ON "User"("sharingCode");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
