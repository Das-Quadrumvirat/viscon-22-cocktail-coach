import { client, sql_client } from "~~/server/utils/db/main"

export default defineEventHandler(async (event) => {
    const drinks_index = client.index('drinks')
    const num_of_drinks = await drinks_index.getStats().then((s) => s.numberOfDocuments)
    const all_drinks = await drinks_index.search('', {
        limit: num_of_drinks
    }).then((d) => d.hits)
    const created_drinks = await Promise.all(all_drinks.map(async (drink) => {
        return await sql_client.meiliDrink.upsert({
            create: {
                name: drink.name,
                slug: drink.slug,
            },
            update: {
                name: drink.name,
                slug: drink.slug,
            },
            where: {
                slug: drink.slug
            }
        })
    }))
    return created_drinks
})