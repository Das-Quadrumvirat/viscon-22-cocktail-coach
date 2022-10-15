import { SearchParams } from "meilisearch"
import { client } from "../utils/db/main"
import { IngredientResponse } from "./ingredient/[slug].get"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const queryOpts: SearchParams = {
    sort: ["slug:asc"]
  }
  if (query.limit) queryOpts.limit = parseInt(query.limit.toString())
  if (query.offst) queryOpts.offset = parseInt(query.limit.toString())
  const res = await client.index('ingredients').search('', queryOpts)
  let ingredients: IngredientResponse[] = []
  for (let hit of res.hits) {
    const ing: IngredientResponse = {
      id: hit.id,
      name: hit.name,
      description: hit.description,
      ingredientType: hit.ingredientResponse,
      alcohol: hit.alcohol,
      ABV: hit.ABV,
    }
    console.log(ing)
    ingredients.push(ing)
  }
  return ingredients
})
