/*
  Warnings:

  - You are about to drop the column `userId` on the `Watch` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Watch" DROP CONSTRAINT "Watch_userId_fkey";

-- AlterTable
ALTER TABLE "Watch" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserToWatch" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWatch_AB_unique" ON "_UserToWatch"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWatch_B_index" ON "_UserToWatch"("B");

-- AddForeignKey
ALTER TABLE "_UserToWatch" ADD CONSTRAINT "_UserToWatch_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWatch" ADD CONSTRAINT "_UserToWatch_B_fkey" FOREIGN KEY ("B") REFERENCES "Watch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
