-- DropIndex
DROP INDEX "PendingAuth_expiresAt_idx";

-- DropIndex
DROP INDEX "RevokedToken_expiresAt_idx";

-- CreateIndex
CREATE INDEX "Actionneur_discordId_idx" ON "Actionneur"("discordId");

-- CreateIndex
CREATE INDEX "CharbonAttendee_discordUserId_idx" ON "CharbonAttendee"("discordUserId");

-- CreateIndex
CREATE INDEX "Course_discordVoiceChannelId_idx" ON "Course"("discordVoiceChannelId");

-- CreateIndex
CREATE INDEX "PendingAuth_discordId_idx" ON "PendingAuth"("discordId");

-- CreateIndex
CREATE INDEX "RevokedToken_token_idx" ON "RevokedToken"("token");
