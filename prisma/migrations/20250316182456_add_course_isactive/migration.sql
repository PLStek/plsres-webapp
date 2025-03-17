-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "discordResourceChannelId" TEXT NOT NULL,
    "discordVoiceChannelId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "category" TEXT NOT NULL
);
INSERT INTO "new_Course" ("category", "code", "discordResourceChannelId", "discordVoiceChannelId", "id", "title") SELECT "category", "code", "discordResourceChannelId", "discordVoiceChannelId", "id", "title" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");
CREATE UNIQUE INDEX "Course_discordResourceChannelId_key" ON "Course"("discordResourceChannelId");
CREATE UNIQUE INDEX "Course_discordVoiceChannelId_key" ON "Course"("discordVoiceChannelId");
CREATE INDEX "Course_discordVoiceChannelId_idx" ON "Course"("discordVoiceChannelId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
