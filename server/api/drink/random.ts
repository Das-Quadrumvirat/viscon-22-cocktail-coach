import { randomInt } from "crypto"
import { client } from "~~/server/utils/db/main"
import { drinkFromHit } from "~~/server/utils/drink_from_hit"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const query_tags = query.tags as string | undefined
    const tags = query_tags === undefined ? undefined : query_tags.split(",")
    const tags_filter = tags === undefined ? '' : `(${tags.map((t) => `tags = ${t}`).join(' OR ')})`

    const query_category = query.category as string | undefined
    const category_filter = query_category === undefined ? '' : `category = "${query_category}"`

    const query_iba = query.iba as string | undefined
    const iba_filter = query_iba === undefined ? '' : `iba = "${query_iba}"`

    const query_alcoholic = query.alcoholic as string | undefined
    const alcoholic_filter = query_alcoholic === undefined ? '' : `alcoholic = ${query_alcoholic}`

    const query_glass = query.glass as string | undefined
    const glass_filter = query_glass === undefined ? '' : `glass = "${query_glass}"`

    const query_ingredients = query.ingredients as string | undefined
    const ingredients = query_ingredients === undefined ? undefined : query_ingredients.split(",")
    const ingredients_filter = ingredients === undefined ? '' : `(${ingredients.map((i) => `ingredients = "${i}"`).join(' OR ')})`

    const query_search = query.search as string | undefined
    const search_filter = query_search === undefined ? '' : query_search

    const drinks_index = client.index('drinks')
    const stats = await drinks_index.getStats()
    const result = await drinks_index.search(search_filter, {
        filter: [tags_filter, category_filter, iba_filter, alcoholic_filter, glass_filter, ingredients_filter],
        limit: stats.numberOfDocuments
    })
    const hits = result.hits
    const hit_idx = randomInt(hits.length)
    return await drinkFromHit(hits[hit_idx])
})
