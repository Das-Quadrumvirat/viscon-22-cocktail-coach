-- CreateTable
CREATE TABLE "MeiliDrink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "MeiliDrink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MeiliDrinkToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MeiliDrink_name_key" ON "MeiliDrink"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MeiliDrink_slug_key" ON "MeiliDrink"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_MeiliDrinkToUser_AB_unique" ON "_MeiliDrinkToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MeiliDrinkToUser_B_index" ON "_MeiliDrinkToUser"("B");

-- AddForeignKey
ALTER TABLE "_MeiliDrinkToUser" ADD CONSTRAINT "_MeiliDrinkToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "MeiliDrink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeiliDrinkToUser" ADD CONSTRAINT "_MeiliDrinkToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
