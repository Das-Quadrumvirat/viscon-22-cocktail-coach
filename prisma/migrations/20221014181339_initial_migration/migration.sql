-- CreateTable
CREATE TABLE "Drink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "categoryId" INTEGER NOT NULL,
    "iBAId" INTEGER NOT NULL,
    "alcoholic" BOOLEAN NOT NULL,
    "glassId" INTEGER NOT NULL,
    "instructionsEN" TEXT,
    "instructionsES" TEXT,
    "instructionsDE" TEXT,
    "instructionsFR" TEXT,
    "instructionsIT" TEXT,
    "drinkThumb" TEXT,
    "measures" TEXT[],
    "imageSource" TEXT NOT NULL,

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
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "alcohol" BOOLEAN NOT NULL,
    "ABV" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DrinkToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DrinkToIngredient_AB_unique" ON "_DrinkToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_DrinkToIngredient_B_index" ON "_DrinkToIngredient"("B");

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_iBAId_fkey" FOREIGN KEY ("iBAId") REFERENCES "IBA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_glassId_fkey" FOREIGN KEY ("glassId") REFERENCES "Glass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrinkToIngredient" ADD CONSTRAINT "_DrinkToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Drink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrinkToIngredient" ADD CONSTRAINT "_DrinkToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
