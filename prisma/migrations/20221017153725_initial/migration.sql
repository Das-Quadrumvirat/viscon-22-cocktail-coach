-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('EN', 'ES', 'DE', 'FR', 'IT');

-- CreateEnum
CREATE TYPE "RatingValue" AS ENUM ('One', 'Two', 'Three', 'Four', 'Five');

-- CreateTable
CREATE TABLE "Drink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "iBAId" INTEGER,
    "alcoholic" BOOLEAN NOT NULL,
    "glassId" INTEGER NOT NULL,
    "drinkThumb" TEXT,
    "measures" TEXT[],
    "imageAttribution" TEXT,
    "imageSource" TEXT,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IBA" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "IBA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Glass" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Glass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "alcohol" BOOLEAN NOT NULL,
    "ABV" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructions" (
    "id" SERIAL NOT NULL,
    "lang" "Lang" NOT NULL,
    "text" TEXT NOT NULL,
    "drinkId" INTEGER,

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" BYTEA NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeiliDrink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "MeiliDrink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "value" "RatingValue" NOT NULL,
    "userId" INTEGER NOT NULL,
    "meiliDrinkId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DrinkToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DrinkToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MeiliDrinkToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IBA_name_key" ON "IBA"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Glass_name_key" ON "Glass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MeiliDrink_name_key" ON "MeiliDrink"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MeiliDrink_slug_key" ON "MeiliDrink"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_DrinkToTag_AB_unique" ON "_DrinkToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DrinkToTag_B_index" ON "_DrinkToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DrinkToIngredient_AB_unique" ON "_DrinkToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_DrinkToIngredient_B_index" ON "_DrinkToIngredient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MeiliDrinkToUser_AB_unique" ON "_MeiliDrinkToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MeiliDrinkToUser_B_index" ON "_MeiliDrinkToUser"("B");

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_iBAId_fkey" FOREIGN KEY ("iBAId") REFERENCES "IBA"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_glassId_fkey" FOREIGN KEY ("glassId") REFERENCES "Glass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_meiliDrinkId_fkey" FOREIGN KEY ("meiliDrinkId") REFERENCES "MeiliDrink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrinkToTag" ADD CONSTRAINT "_DrinkToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Drink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrinkToTag" ADD CONSTRAINT "_DrinkToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrinkToIngredient" ADD CONSTRAINT "_DrinkToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Drink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrinkToIngredient" ADD CONSTRAINT "_DrinkToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeiliDrinkToUser" ADD CONSTRAINT "_MeiliDrinkToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "MeiliDrink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeiliDrinkToUser" ADD CONSTRAINT "_MeiliDrinkToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
