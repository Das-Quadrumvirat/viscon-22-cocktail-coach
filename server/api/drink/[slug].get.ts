import { Drink, Ingredient } from "~~/util/types"
import { client } from "../../utils/db/main"

export default defineEventHandler(async (event): Promise<Drink> => {
    const slug = event.context.params.slug
    const drink = (await client.index('drinks').search('', {limit: 1, filter: 'slug = ' + slug})).hits.at(0)
    const ingredients = await Promise.all(drink.ingredients.map(async (slug, index): Promise<{
        ingredient: Ingredient,
        measure: String
    }> => {
        const ingredient = (await client.index('ingredients').search('', {limit: 1, filter: 'slug = ' + slug})).hits.at(0)
        return {
            ingredient: {
                id: ingredient.id,
                name: ingredient.name,
                slug: slug,
                description: ingredient.description,
                ingredientType: ingredient.ingredientType,
                ABV: ingredient.abv,
                alcohol: ingredient.alcohol
            },
            measure: drink.measures[index]
        }
    }))
    return {
        id: drink.id,
        name: drink.name,
        slug: drink.slug,
        tags: drink.tags,
        category: drink.category,
        iba: drink.iba,
        alcoholic: drink.alcoholic,
        glass: drink.glass,
        instructions: drink.instructions,
        drinkThumb: drink.drinkThumb,
        ingredients: ingredients,
        imageAttribution: drink.imageAttribution,
        imageSource: drink.imageSource
    }
})
