import { SearchParams } from "meilisearch"
import { Ingredient } from "~~/util/types"
import { client } from "../utils/db/main"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const queryOpts: SearchParams = {
    sort: ["slug:asc"]
  }
  if (query.limit) queryOpts.limit = parseInt(query.limit.toString())
  if (query.offst) queryOpts.offset = parseInt(query.limit.toString())
  const res = await client.index('ingredients').search('', queryOpts)
  let ingredients: Ingredient[] = []
  for (let hit of res.hits) {
    const ing: Ingredient = {
      id: hit.id,
      name: hit.name,
      slug: hit.slug,
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
