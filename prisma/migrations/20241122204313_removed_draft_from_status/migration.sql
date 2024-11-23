/*
  Warnings:

  - The values [DRAFT] on the enum `CharbonStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[charbonId,discordUserId]` on the table `CharbonAttendee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CharbonStatus_new" AS ENUM ('SCHEDULED', 'ONGOING', 'FINISHED');
ALTER TABLE "Charbon" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Charbon" ALTER COLUMN "status" TYPE "CharbonStatus_new" USING ("status"::text::"CharbonStatus_new");
ALTER TYPE "CharbonStatus" RENAME TO "CharbonStatus_old";
ALTER TYPE "CharbonStatus_new" RENAME TO "CharbonStatus";
DROP TYPE "CharbonStatus_old";
ALTER TABLE "Charbon" ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';
COMMIT;

-- AlterTable
ALTER TABLE "Charbon" ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';

-- CreateIndex
CREATE UNIQUE INDEX "CharbonAttendee_charbonId_discordUserId_key" ON "CharbonAttendee"("charbonId", "discordUserId");
