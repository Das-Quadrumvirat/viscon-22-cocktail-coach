import { client } from "../utils/db/main"
import { SearchParams } from 'meilisearch';
import { Drink } from "~~/util/types";
import { drinksFromHits } from "../utils/drink_from_hit";


export default defineEventHandler(async (event): Promise<Drink[]> => {
  const query = getQuery(event)
  const queryOpts: SearchParams = {
    sort: ["slug:asc"]
  }

  queryOpts.limit = query.limit ? parseInt(query.limit.toString()) : 1000
  if (query.offset) queryOpts.offset = parseInt(query.offset.toString())
  const res = await client.index('drinks').search('', queryOpts)
  const foo = await drinksFromHits(res.hits)
  return foo
})
