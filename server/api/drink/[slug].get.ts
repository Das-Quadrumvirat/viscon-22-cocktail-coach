import { Drink } from "~~/util/types"
import { client } from "../../utils/db/main"
import { drinkFromHit } from "~~/server/utils/drink_from_hit"

export default defineEventHandler(async (event): Promise<Drink> => {
    const slug = event.context.params.slug
    const hit = (await client.index('drinks').search('', {limit: 1, filter: 'slug = ' + slug})).hits.at(0)
    return await drinkFromHit(hit)
})
