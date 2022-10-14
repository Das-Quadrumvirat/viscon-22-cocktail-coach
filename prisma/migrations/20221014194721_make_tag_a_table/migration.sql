/*
  Warnings:

  - You are about to drop the column `tags` on the `Drink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drink" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DrinkToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DrinkToTag_AB_unique" ON "_DrinkToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DrinkToTag_B_index" ON "_DrinkToTag"("B");

-- AddForeignKey
ALTER TABLE "_DrinkToTag" ADD CONSTRAINT "_DrinkToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Drink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrinkToTag" ADD CONSTRAINT "_DrinkToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
