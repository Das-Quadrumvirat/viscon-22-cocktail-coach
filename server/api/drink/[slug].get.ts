import { client } from "../../utils/db/main"

export type DrinkResponse = {
    id: number,
    name: String,
    tags: String[],
    category: String | null,
    iba: String | null,
    alcoholic: boolean,
    glass: String,
    instructions: String[],
    drinkThumb: String | null,
    ingredients: String[],
    measures: String[],
    imageAttribution: String | null,
    imageSource: String | null,
}

export default defineEventHandler(async (event) => {
    const slug = event.context.params.slug
    const drink = (await client.index('drinks').search('', {limit: 1, filter: 'slug = ' + slug})).hits.at(0)
    const ret: DrinkResponse = {
        id: drink.id,
        name: drink.name,
        tags: drink.tags,
        category: drink.category,
        iba: drink.iba,
        alcoholic: drink.alcoholic,
        glass: drink.glass,
        instructions: drink.instructions,
        drinkThumb: drink.drinkThumb,
        ingredients: drink.ingredients,
        measures: drink.measures,
        imageAttribution: drink.imageAttribution,
        imageSource: drink.imageSource
    }
    return ret
})
