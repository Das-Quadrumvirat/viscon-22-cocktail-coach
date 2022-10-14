/*
  Warnings:

  - You are about to drop the column `instructionsDE` on the `Drink` table. All the data in the column will be lost.
  - You are about to drop the column `instructionsEN` on the `Drink` table. All the data in the column will be lost.
  - You are about to drop the column `instructionsES` on the `Drink` table. All the data in the column will be lost.
  - You are about to drop the column `instructionsFR` on the `Drink` table. All the data in the column will be lost.
  - You are about to drop the column `instructionsIT` on the `Drink` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('EN', 'ES', 'DE', 'FR', 'IT');

-- AlterTable
ALTER TABLE "Drink" DROP COLUMN "instructionsDE",
DROP COLUMN "instructionsEN",
DROP COLUMN "instructionsES",
DROP COLUMN "instructionsFR",
DROP COLUMN "instructionsIT";

-- CreateTable
CREATE TABLE "Instructions" (
    "id" INTEGER NOT NULL,
    "lang" "Lang" NOT NULL,
    "text" TEXT NOT NULL,
    "drinkId" INTEGER,

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE SET NULL ON UPDATE CASCADE;
