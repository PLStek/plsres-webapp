-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Charbon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "replayUrl" TEXT,
    "courseId" INTEGER NOT NULL,
    "discordEventId" TEXT NOT NULL,
    CONSTRAINT "Charbon_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Charbon" ("courseId", "description", "discordEventId", "id", "isDraft", "name", "replayUrl", "status", "timestamp") SELECT "courseId", "description", "discordEventId", "id", "isDraft", "name", "replayUrl", "status", "timestamp" FROM "Charbon";
DROP TABLE "Charbon";
ALTER TABLE "new_Charbon" RENAME TO "Charbon";
CREATE UNIQUE INDEX "Charbon_replayUrl_key" ON "Charbon"("replayUrl");
CREATE UNIQUE INDEX "Charbon_discordEventId_key" ON "Charbon"("discordEventId");
CREATE INDEX "Charbon_courseId_idx" ON "Charbon"("courseId");
CREATE INDEX "Charbon_discordEventId_idx" ON "Charbon"("discordEventId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
