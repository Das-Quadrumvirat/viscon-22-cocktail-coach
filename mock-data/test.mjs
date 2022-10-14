import pkg from '@prisma/client';
const { PrismaClient, Tag, Category, Drink, Glass } = pkg;
const prisma = new PrismaClient()
import fs from 'fs'

var file = fs.readFile('../data_scrape/tags.json', (err, data) => {
  console.log(JSON.parse(data.toString()))
})


