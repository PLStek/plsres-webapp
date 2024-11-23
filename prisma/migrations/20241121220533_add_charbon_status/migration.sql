/*
  Warnings:

  - You are about to drop the column `draft` on the `Charbon` table. All the data in the column will be lost.
  - You are about to drop the column `ongoing` on the `Charbon` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CharbonStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'STARTED', 'FINISHED');

-- AlterTable
ALTER TABLE "Charbon" DROP COLUMN "draft",
DROP COLUMN "ongoing",
ADD COLUMN     "status" "CharbonStatus" NOT NULL DEFAULT 'DRAFT';
