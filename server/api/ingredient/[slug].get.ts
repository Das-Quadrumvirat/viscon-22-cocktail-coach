import { Ingredient } from "~~/util/types"
import { client } from "../../utils/db/main"

export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug
  console.log(slug)
  const ing = (await client.index('ingredients').search('', { limit: 1, filter: 'slug = ' + slug })).hits.at(0)
  const ret: Ingredient = {
    id: ing.id,
    name: ing.name,
    slug: slug,
    description: ing.description,
    ingredientType: ing.ingredientType,
    alcohol: ing.alcohol,
    ABV: ing.abv,
  }

  return ret
})
