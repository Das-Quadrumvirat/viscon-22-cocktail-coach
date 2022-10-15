import { client } from "../utils/db/main"
import { SearchParams } from 'meilisearch';
import { Drink, Ingredient, SearchResult } from "~~/util/types";
import { drinkFromHit } from "../utils/drink_from_hit";


export default defineEventHandler(async (event): Promise<SearchResult> => {
  // input: q: String, page: Number, maxItems: Number
  const query = getQuery(event)
  const queryOpts: SearchParams = {
    sort: ["slug:asc"]
  }
  if (query.limit) queryOpts.limit = parseInt(query.limit.toString())
  if (query.offset) queryOpts.offset = parseInt(query.offset.toString())
  const res = await client.index('drinks').search('', queryOpts)
  return Promise.all(res.hits.map(drinkFromHit))
})
