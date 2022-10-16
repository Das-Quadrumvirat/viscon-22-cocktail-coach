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
      arrOfEquals.push('(ingredients = ' + filter + ')')
    }
    let res = arrOfEquals.at(0)

    for (let i = 1; i < arrOfEquals.length; i++) {
      res += ' AND '
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
  let filtered = query.filtered ? (Array.isArray(query.filtered) ? query.filtered as string[] :  [query.filtered as string]) : []

  const limit = maxItems
  const offset = page * maxItems

  const queryOpts: SearchParams = {
    sort: ["slug:asc"],
    filter: build_filter(filtered),
    limit: 1000
  }

  console.log(queryOpts)

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

  let ingredients = (await client.index('ingredients').search('', { limit: 1000 })).hits
  let ingMap: Map<string, Ingredient> = new Map()
  for (let ing of ingredients) {
    ingMap.set(ing.slug, {
      id: ing.id,
      slug: ing.slug,
      name: ing.name,
      description: ing.description,
      ingredientType: ing.ingredientType,
      alcohol: ing.alcohol,
      ABV: ing.abv,
    })
  }
  let ingrResult: {
    ingredient: Ingredient,
    number: number,
  }[] = []
  for (let [slug, num] of ingrArr.entries()) {
    let res = ingMap.get(slug)
    ingrResult.push({
      ingredient: res,
      number: num,
    })
  }

  let drinkArr = await Promise.all(hits.slice(offset, offset + limit).map(async (hit) => {
    const ingrList: { ingredient: Ingredient, measure: String }[] = []
    const lengthIngs = hit.ingredients.length
    for (let i = 0; i < lengthIngs; i++) {
      const ingrr = ingMap.get(hit.ingredients.at(i))
      const meas = hit.measures.at(i)
      ingrList.push({ ingredient: ingrr, measure: meas })
    }
    const drink: Drink = {
      id: hit.id,
      slug: hit.slug,
      name: hit.name,
      tags: hit.tags,
      category: hit.category,
      iba: hit.iba,
      alcoholic: hit.alcoholic,
      glass: hit.glass,
      instructions: hit.instructions,
      drinkThumb: hit.drinkThumb,
      ingredients: ingrList,
      imageAttribution: hit.imageAttribution,
      imageSource: hit.imageSource,
    }
    return drink
  }))
  let numPages: number = (hits.length / (maxItems + 1)) >> 0
  return {
    containedIngredients: ingrResult,
    drinks: drinkArr,
    numberOfPages: numPages + 1,
    numberOfHits: hits.length
  }
})
