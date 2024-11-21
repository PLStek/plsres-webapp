/*
  Warnings:

  - A unique constraint covering the columns `[replayUrl]` on the table `Charbon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordEventId]` on the table `Charbon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordResourceChannelId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordVoiceChannelId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Charbon_replayUrl_key" ON "Charbon"("replayUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Charbon_discordEventId_key" ON "Charbon"("discordEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_discordResourceChannelId_key" ON "Course"("discordResourceChannelId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_discordVoiceChannelId_key" ON "Course"("discordVoiceChannelId");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_discordId_key" ON "Invitation"("discordId");
