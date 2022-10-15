import { MeiliSearch } from 'meilisearch'
import fs from 'fs/promises'

var drinks = JSON.parse((await fs.readFile('../data_scrape/drinks.json')).toString())

for (let drink of drinks) {
  delete drink.type
  drink.id++
}

await fs.writeFile('./drinks-meili.json', JSON.stringify(drinks))


