-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(60) NOT NULL,
    "lastName" VARCHAR(90) NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "policy" BOOLEAN NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "backdropPathUrl" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "averageVote" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToUser_AB_unique" ON "_MovieToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToUser_B_index" ON "_MovieToUser"("B");

-- AddForeignKey
ALTER TABLE "_MovieToUser" ADD FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
