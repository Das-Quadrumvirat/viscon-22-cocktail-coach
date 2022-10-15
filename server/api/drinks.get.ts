import { client } from "../utils/db/main"
import { DrinkResponse } from "./drink/[slug].get"
import { SearchParams } from 'meilisearch';


export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const queryOpts: SearchParams = {
    sort: ["slug:asc"]
  }
  if (query.limit) queryOpts.limit = parseInt(query.limit.toString())
  if (query.offst) queryOpts.offset = parseInt(query.limit.toString())
  const res = await client.index('drinks').search('', queryOpts)
  let drinks: DrinkResponse[] = []
  for (let hit of res.hits) {
    const drink: DrinkResponse = {
      id: hit.id,
      name: hit.name,
      tags: hit.tags,
      category: hit.category,
      iba: hit.iba,
      alcoholic: hit.alcoholic,
      glass: hit.glass,
      instructions: hit.instructions,
      drinkThumb: hit.drinkThumb,
      ingredients: hit.ingredients,
      measures: hit.measures,
      imageAttribution: hit.imageAttribution,
      imageSource: hit.imageSource
    }
    drinks.push(drink)
  }
  return drinks
})

