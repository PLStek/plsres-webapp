-- CreateTable
CREATE TABLE "PendingAuth" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingAuth_discordId_key" ON "PendingAuth"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "PendingAuth_accessToken_key" ON "PendingAuth"("accessToken");

-- CreateIndex
CREATE INDEX "PendingAuth_expiresAt_idx" ON "PendingAuth"("expiresAt");
