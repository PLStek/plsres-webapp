-- AlterTable
ALTER TABLE "Charbon" ALTER COLUMN "discordEventId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "discordResourceChannelId" DROP DEFAULT,
ALTER COLUMN "discordVoiceChannelId" DROP DEFAULT;
