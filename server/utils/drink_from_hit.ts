import { client } from "./db/main"
import { Hit } from 'meilisearch'
import { Drink, Ingredient } from "~~/util/types"

export async function drinkFromHit(hit: Hit<Record<string, any>>): Promise<Drink> {
    const ingredients = await Promise.all(hit.ingredients.map(async (slug, index): Promise<{
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
            measure: hit.measures[index]
        }
    }))
    return {
        id: hit.id,
        name: hit.name,
        slug: hit.slug,
        tags: hit.tags,
        category: hit.category,
        iba: hit.iba,
        alcoholic: hit.alcoholic,
        glass: hit.glass,
        instructions: hit.instructions,
        drinkThumb: hit.drinkThumb,
        ingredients: ingredients,
        imageAttribution: hit.imageAttribution,
        imageSource: hit.imageSource
    }
}

