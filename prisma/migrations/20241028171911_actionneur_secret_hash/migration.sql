/*
  Warnings:

  - Added the required column `secretHash` to the `Actionneur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actionneur" ADD COLUMN     "secretHash" TEXT NOT NULL;
