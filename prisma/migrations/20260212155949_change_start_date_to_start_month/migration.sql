/*
  Warnings:

  - You are about to drop the column `startDate` on the `Debit` table. All the data in the column will be lost.
  - Added the required column `startMonth` to the `Debit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debit" DROP COLUMN "startDate",
ADD COLUMN     "startMonth" INTEGER NOT NULL;
