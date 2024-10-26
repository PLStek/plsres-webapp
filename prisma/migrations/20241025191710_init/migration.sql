-- CreateEnum
CREATE TYPE "CourseCategory" AS ENUM ('MATH', 'ELEC', 'INFO', 'MECA');

-- CreateTable
CREATE TABLE "Charbon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "replayUrl" TEXT,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Charbon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "CourseCategory" NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "charbonId" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actionneur" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Actionneur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharbonActionneur" (
    "charbonId" INTEGER NOT NULL,
    "actionneurId" INTEGER NOT NULL,

    CONSTRAINT "CharbonActionneur_pkey" PRIMARY KEY ("charbonId","actionneurId")
);

-- CreateIndex
CREATE INDEX "courseId" ON "Charbon"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Actionneur_discordId_key" ON "Actionneur"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Actionneur_username_key" ON "Actionneur"("username");

-- AddForeignKey
ALTER TABLE "Charbon" ADD CONSTRAINT "Charbon_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_charbonId_fkey" FOREIGN KEY ("charbonId") REFERENCES "Charbon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharbonActionneur" ADD CONSTRAINT "CharbonActionneur_charbonId_fkey" FOREIGN KEY ("charbonId") REFERENCES "Charbon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharbonActionneur" ADD CONSTRAINT "CharbonActionneur_actionneurId_fkey" FOREIGN KEY ("actionneurId") REFERENCES "Actionneur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
