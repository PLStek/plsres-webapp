-- AlterTable
ALTER TABLE "Charbon" ADD COLUMN "discordEventId" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Course" ADD COLUMN "discordResourceChannelId" TEXT DEFAULT '',
ADD COLUMN "discordVoiceChannelId" TEXT DEFAULT '';

-- Update existing rows with empty default values
UPDATE "Charbon" SET "discordEventId" = '';
UPDATE "Course" SET "discordResourceChannelId" = '', "discordVoiceChannelId" = '';

-- AlterTable to set columns as NOT NULL
ALTER TABLE "Charbon" ALTER COLUMN "discordEventId" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "discordResourceChannelId" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "discordVoiceChannelId" SET NOT NULL;

-- CreateTable
CREATE TABLE "CharbonDiscordUser" (
    "id" SERIAL NOT NULL,
    "charbonId" INTEGER NOT NULL,
    "discordId" TEXT NOT NULL,

    CONSTRAINT "CharbonDiscordUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "charbonId" ON "CharbonDiscordUser"("charbonId");

-- AddForeignKey
ALTER TABLE "CharbonDiscordUser" ADD CONSTRAINT "CharbonDiscordUser_charbonId_fkey" FOREIGN KEY ("charbonId") REFERENCES "Charbon"("id") ON DELETE CASCADE ON UPDATE CASCADE;