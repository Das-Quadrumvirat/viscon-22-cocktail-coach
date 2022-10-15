import { MeiliSearch } from 'meilisearch'
import fs from 'fs/promises'

var drinks = JSON.parse((await fs.readFile('../data_scrape/drinks.json')).toString())
var ingredients = JSON.parse((await fs.readFile('../data_scrape/ingredients.json')).toString())

for (let drink of drinks) {
  delete drink.type
  drink.id++
}

await fs.writeFile('./drinks-meili.json', JSON.stringify(drinks))
await fs.writeFile('./ingredients-meili.json', JSON.stringify(ingredients))


