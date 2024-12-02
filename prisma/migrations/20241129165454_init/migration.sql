-- CreateTable
CREATE TABLE "Charbon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "replayUrl" TEXT,
    "courseId" INTEGER NOT NULL,
    "discordEventId" TEXT NOT NULL,
    CONSTRAINT "Charbon_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CharbonAttendee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "charbonId" INTEGER NOT NULL,
    "discordUserId" TEXT NOT NULL,
    CONSTRAINT "CharbonAttendee_charbonId_fkey" FOREIGN KEY ("charbonId") REFERENCES "Charbon" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discordResourceChannelId" TEXT NOT NULL,
    "discordVoiceChannelId" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "charbonId" INTEGER NOT NULL,
    "extension" TEXT NOT NULL,
    CONSTRAINT "Resource_charbonId_fkey" FOREIGN KEY ("charbonId") REFERENCES "Charbon" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Actionneur" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "secretHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CharbonActionneur" (
    "charbonId" INTEGER NOT NULL,
    "actionneurId" INTEGER NOT NULL,

    PRIMARY KEY ("charbonId", "actionneurId"),
    CONSTRAINT "CharbonActionneur_charbonId_fkey" FOREIGN KEY ("charbonId") REFERENCES "Charbon" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CharbonActionneur_actionneurId_fkey" FOREIGN KEY ("actionneurId") REFERENCES "Actionneur" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RevokedToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Charbon_replayUrl_key" ON "Charbon"("replayUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Charbon_discordEventId_key" ON "Charbon"("discordEventId");

-- CreateIndex
CREATE INDEX "Charbon_courseId_idx" ON "Charbon"("courseId");

-- CreateIndex
CREATE INDEX "Charbon_discordEventId_idx" ON "Charbon"("discordEventId");

-- CreateIndex
CREATE INDEX "CharbonAttendee_charbonId_idx" ON "CharbonAttendee"("charbonId");

-- CreateIndex
CREATE UNIQUE INDEX "CharbonAttendee_charbonId_discordUserId_key" ON "CharbonAttendee"("charbonId", "discordUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Course_discordResourceChannelId_key" ON "Course"("discordResourceChannelId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_discordVoiceChannelId_key" ON "Course"("discordVoiceChannelId");

-- CreateIndex
CREATE INDEX "Resource_charbonId_idx" ON "Resource"("charbonId");

-- CreateIndex
CREATE UNIQUE INDEX "Actionneur_discordId_key" ON "Actionneur"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Actionneur_username_key" ON "Actionneur"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_discordId_key" ON "Invitation"("discordId");

-- CreateIndex
CREATE INDEX "Invitation_token_idx" ON "Invitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "RevokedToken_token_key" ON "RevokedToken"("token");

-- CreateIndex
CREATE INDEX "RevokedToken_expiresAt_idx" ON "RevokedToken"("expiresAt");
