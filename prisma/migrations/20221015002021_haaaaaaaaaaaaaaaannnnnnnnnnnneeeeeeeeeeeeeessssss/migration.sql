-- DropForeignKey
ALTER TABLE "Drink" DROP CONSTRAINT "Drink_iBAId_fkey";

-- AlterTable
ALTER TABLE "Drink" ALTER COLUMN "iBAId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_iBAId_fkey" FOREIGN KEY ("iBAId") REFERENCES "IBA"("id") ON DELETE SET NULL ON UPDATE CASCADE;