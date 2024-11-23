/*
  Warnings:

  - The values [STARTED] on the enum `CharbonStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `CharbonDiscordUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CharbonStatus_new" AS ENUM ('DRAFT', 'SCHEDULED', 'ONGOING', 'FINISHED');
ALTER TABLE "Charbon" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Charbon" ALTER COLUMN "status" TYPE "CharbonStatus_new" USING ("status"::text::"CharbonStatus_new");
ALTER TYPE "CharbonStatus" RENAME TO "CharbonStatus_old";
ALTER TYPE "CharbonStatus_new" RENAME TO "CharbonStatus";
DROP TYPE "CharbonStatus_old";
ALTER TABLE "Charbon" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- DropForeignKey
ALTER TABLE "CharbonDiscordUser" DROP CONSTRAINT "CharbonDiscordUser_charbonId_fkey";

-- DropTable
DROP TABLE "CharbonDiscordUser";

-- CreateTable
CREATE TABLE "CharbonAttendee" (
    "id" SERIAL NOT NULL,
    "charbonId" INTEGER NOT NULL,
    "discordUserId" TEXT NOT NULL,

    CONSTRAINT "CharbonAttendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "charbonId" ON "CharbonAttendee"("charbonId");

-- AddForeignKey
ALTER TABLE "CharbonAttendee" ADD CONSTRAINT "CharbonAttendee_charbonId_fkey" FOREIGN KEY ("charbonId") REFERENCES "Charbon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
