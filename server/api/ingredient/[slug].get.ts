import { client } from "../../utils/db/main"

export type IngredientResponse = {
    id: number,
    name: String,
    description: String,
    ingredientType: String,
    alcohol: Boolean,
    ABV: number,
}

export default defineEventHandler(async (event) => {
    const slug = event.context.params.slug
    const ing = (await client.index('ingredients').search('', {limit: 1, filter: 'slug = ' + slug})).hits.at(0)
    const ret: IngredientResponse = {
        id: ing.id,
        name: ing.name,
        description: ing.description,
        ingredientType: ing.ingredientType,
        alcohol: ing.alcohol,
        ABV: ing.ABV,
    }

    return ret
})
