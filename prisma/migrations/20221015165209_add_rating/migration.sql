-- CreateEnum
CREATE TYPE "RatingValue" AS ENUM ('One', 'Two', 'Three', 'Four', 'Five');

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "value" "RatingValue" NOT NULL,
    "userId" INTEGER NOT NULL,
    "meiliDrinkId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_meiliDrinkId_fkey" FOREIGN KEY ("meiliDrinkId") REFERENCES "MeiliDrink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
