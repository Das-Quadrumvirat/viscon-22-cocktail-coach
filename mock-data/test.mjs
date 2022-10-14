import pkg from '@prisma/client';
import { error } from 'console';
const { PrismaClient, Tag, Category, Drink, Glass, Ingredient } = pkg;
// import { PrismaClient, Drink, Glass, Tag, Category, IBA, Ingredient, Instructions, Lang } from '@prisma/client'
const prisma = new PrismaClient()
import fs from 'fs/promises'

var tags = JSON.parse((await fs.readFile("../data_scrape/tags.json")).toString())
var categories = JSON.parse((await fs.readFile("../data_scrape/categories.json")).toString())
var glasses = JSON.parse((await fs.readFile("../data_scrape/glasses.json")).toString())
var drinks = JSON.parse((await fs.readFile("../data_scrape/drinks.json")).toString())
var ingredients = JSON.parse((await fs.readFile("../data_scrape/ingredients.json")).toString())
var ibas = JSON.parse((await fs.readFile("../data_scrape/ibas.json")).toString())

await prisma.ingredient.deleteMany({where: {}})
await prisma.iBA.deleteMany({where: {}})
await prisma.tag.deleteMany({where: {}})
await prisma.drink.deleteMany({where: {}})
await prisma.glass.deleteMany({where: {}})
await prisma.category.deleteMany({where: {}})
await prisma.instructions.deleteMany({where: {}})

for (let tag of tags) {
  try {
    const res = await prisma.tag.create({
      data: {
        id: tags.indexOf(tag),
        name: tag,
      }
    })
    console.log(res)
  }
  catch (e) { console.log(e) }
}

for (let category of categories) {
  try {
    const res = await prisma.category.create({
      data: {
        id: categories.indexOf(category),
        name: category,
      }
    })
    console.log(res)
  }
  catch (e) { console.log(e) }
}

for (let glass of glasses) {
  try {
    const res = await prisma.glass.create({
      data: {
        id: glasses.indexOf(glass),
        name: glass,
      }
    })
    console.log(res)
  }
  catch (e) { console.log(e) }
}

for (let ingredient of ingredients) {
  try {
    const res = await prisma.ingredient.create({
      data: {
        id: ingredients.indexOf(ingredient),
        name: ingredient.name,
        description: ingredient.description,
        type: ingredient.ingredientType,
        alcohol: ingredient.alcohol,
        ABV: ingredient.abv,
      }
    })
    console.log(res)
  }
  catch (e) { console.log(e) }
}

for (let iba of ibas) {
  try {
    console.log(iba)
    const res = await prisma.iBA.create({
      data: {
        id: ibas.indexOf(iba),
        name: iba.name,
      }
    })
    console.log(res)
  }
  catch (e) { console.log(e) }
}


let instructionCounter = 0
for (let drink of drinks) {
  try {
    for (let instruction of drink.instructions) {
      const resi = await prisma.instructions.create({
        data: {
          id: instructionCounter++,
          lang: instruction.language.toUpper(),
          text: instruction.content,
          drinkId: drink.id,
        }
      })
      console.log(resi)
    }
    const res = await prisma.drink.create({
      data: {
        id: drinks.indexOf(drink),
        name: drink.name,
        categoryId: categories.indexOf(drink.category),
        iBAId: ibas.indexOf(drink.iba),
        alcoholic: drink.alcoholic,
        glassId: glasses.indexOf(drink.glass),
        drinkThumb: drink.drinkThumb,
        imageSource: drink.imageSource,
        imageAttribution: drink.imageAttribution,
        measures: drink.ingredients,
      }
    })
    console.log(res)
  }
  catch (e) { console.log(e) }
}
