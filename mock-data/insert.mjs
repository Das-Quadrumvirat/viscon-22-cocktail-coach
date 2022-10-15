import pkg from '@prisma/client';
import { error } from 'console';
const { PrismaClient, Tag, Category, Drink, Glass, Ingredient, Instructions, Lang, IBA } = pkg;
// import { PrismaClient, Drink, Glass, Tag, Category, IBA, Ingredient, Instructions, Lang } from '@prisma/client'
const prisma = new PrismaClient()
import fs from 'fs/promises'

// var tags = JSON.parse((await fs.readFile("../data_scrape/tags.json")).toString())
// var categories = JSON.parse((await fs.readFile("../data_scrape/categories.json")).toString())
// var glasses = JSON.parse((await fs.readFile("../data_scrape/glasses.json")).toString())
var drinks = JSON.parse((await fs.readFile("../data_scrape/drinks.json")).toString())
var ingredients = JSON.parse((await fs.readFile("../data_scrape/ingredients.json")).toString())
// var ibas = JSON.parse((await fs.readFile("../data_scrape/ibas.json")).toString())

let counter = -530;
console.log(counter)
await prisma.Ingredient.deleteMany({ where: {} })
await prisma.IBA.deleteMany({ where: {} })
await prisma.Tag.deleteMany({ where: {} })
await prisma.Drink.deleteMany({ where: {} })
await prisma.Glass.deleteMany({ where: {} })
await prisma.Category.deleteMany({ where: {} })
await prisma.Instructions.deleteMany({ where: {} })
counter = 0
console.log(counter)
try {
  for (let drink of drinks) {
    const name = drink.name
    const category = {
      connectOrCreate: {
        create: {
          name: drink.category,
        },
        where: {
          name: drink.category,
        }
      }
    }
    const iba = drink.iba ? {
      connectOrCreate: {
        create: {
          name: drink.iba,
        },
        where: {
          name: drink.iba,
        }
      }
    } : undefined
    const alcoholic = drink.alcoholic
    const glass = {
      connectOrCreate: {
        create: {
          name: drink.glass,
        },
        where: {
          name: drink.glass,
        }
      }
    }
    const tags = {
      connectOrCreate: drink.tags.filter((x) => x).map((tagname) => {
        return {
          create: {
            name: tagname
          },
          where: {
            name: tagname
          }
        }
      })
    }
    const ingredientCreator = {
      connectOrCreate: drink.ingredients.map((name) => {
        var idx = ingredients.findIndex((o) => {
          return o.name.toUpperCase() === name.toUpperCase()
        })
        if (idx === -1) {
          console.log(name)
        }
        const x = ingredients[idx]
        return {
          where: {
            name: name,
          },
          create: {
            name: name,
            description: x.description,
            type: x.ingredientType,
            alcohol: x.alcohol,
            ABV: x.abv,
          }
        }
      })
    }

    const instructions = {
      create: drink.instructions.map((inst) => {
        return {
          lang: inst.language.toUpperCase(),
          text: inst.content,
        }
      })
    }
    await prisma.drink.create({
      data: {
        name: name,
        category: category,
        iba: iba,
        alcoholic: alcoholic,
        glass: glass,
        drinkThumb: drink.drinkThumb,
        measures: drink.measures,
        imageAttribution: drink.imageAttribution,
        imageSource: drink.imageSource,
        ingredients: ingredientCreator,
        instructions: instructions,
        tags: tags
      }
    })
    console.log(++counter, drink.name)
  }
}
catch (e) {
  console.log(e)
}
