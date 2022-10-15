import { client } from "../utils/db/main"
import { SearchParams, Filter, SearchResponse } from 'meilisearch';
import { Drink, Ingredient, SearchResult } from "~~/util/types";
import { drinkFromHit } from "../utils/drink_from_hit";


export default defineEventHandler(async (event): Promise<SearchResult> => {
  function build_filter(filtered: string[]): string {
    if (filtered.length === 0) {
      return ""
    }
    let arrOfEquals: string[] = []
    for (let filter of filtered) {
      arrOfEquals.push('(ingredient=' + filter + ')')
    }
    let res = arrOfEquals.at(0)

    for (let i = 1; i < arrOfEquals.length; i++) {
      res += 'and'
      res += arrOfEquals.at(i)
    }
    return res
  }

  // input: q: String, page: Number, maxItems: Number, available: String[], filtered: String[]
  const query = getQuery(event)
  let q = query.q.toString()
  let page = parseInt(query.page.toString())
  let maxItems = parseInt(query.maxItems.toString())
  let useAvailable = query.useAvailable === 'true'
  let available = query.available as string[] || []
  let filtered = query.filtered as string[] || []

  const limit = maxItems
  const offset = page * maxItems

  const queryOpts: SearchParams = {
    sort: ["slug:asc"],
    filter: build_filter(filtered),
    limit:1000
  }

  const res: SearchResponse = await client.index('drinks').search(q, queryOpts)
  const hits = useAvailable ? res.hits.filter(a => {
    let b = a.ingredients.length
    for (let ing of a.ingredients) {
      if (available.includes(ing)) {
        b--
      }
    }
    return b <= 1
  }
  ) : res.hits.map(e => e)

  let ingrArr: Map<string, number> = new Map()
  for (let hit of hits) {
    for (let ingr of hit.ingredients) {
      const entry = ingrArr.get(ingr)
      if (entry) {
        ingrArr.set(ingr, entry + 1)
      } else {
        ingrArr.set(ingr, 1)
      }
    }
  }

  let ingrResult: {
    ingredient: Ingredient,
    number: Number,
  }[] = []
  for (let [slug, num] of ingrArr.entries()) {
    const res = (await client.index('ingredients').search('', { filter: 'slug = ' + slug, limit: 1 })).hits.at(0)
    const ing: Ingredient = {
      id: res.id,
      slug: res.slug,
      name: res.name,
      description: res.description,
      ingredientType: res.ingredientType,
      alcohol: res.alcohol,
      ABV: res.abv,
    }
    ingrResult.push({
      ingredient: ing,
      number: num,
    })
  }

  let drinkArr = await Promise.all(hits.slice(offset, limit).map(drinkFromHit))
  let numPages: number = (hits.length / (maxItems + 1)) >> 0
  return {
    containedIngredients: ingrResult,
    drinks: drinkArr,
    numberOfPages: numPages + 1,
  }
})
