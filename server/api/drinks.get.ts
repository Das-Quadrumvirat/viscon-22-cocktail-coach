import { client } from "../utils/db/main"
import { SearchParams } from 'meilisearch';
import { Drink } from "~~/util/types";


export default defineEventHandler(async (event): Promise<Drink[]> => {
  const query = getQuery(event)
  const queryOpts: SearchParams = {
    sort: ["slug:asc"]
  }
  if (query.limit) queryOpts.limit = parseInt(query.limit.toString())
  if (query.offst) queryOpts.offset = parseInt(query.limit.toString())
  const res = await client.index('drinks').search('', queryOpts)
  return res.hits.map(hit => {
    return {
      id: hit.id,
      name: hit.name,
      slug: hit.slug,
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
  })
})

