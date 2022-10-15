import { Lang } from "@prisma/client"
import { client } from "../../utils/db/main"


export type CategoryDrinkResponse = {
    id: number,
    name: string,
}

export type IbaDrinkResponse = {
    id: number,
    name: string,
}

export type GlassDrinkResponse = {
    id: number,
    name: string,
}

export type IngredientDrinkResponse = {
    id: number,
    name: string,
    description: string,
    type: string,
    alcohol: boolean,
}

export type TagDrinkResponse = {
    id: number,
    name: string
}

export type LangDrinkResponse = Lang

export type InstructionsDrinkResponse = {
    id: number,
    lang: LangDrinkResponse,
    text: string,
}

export type DrinkResponse = {
    id: number,
    name: string,
    tags: TagDrinkResponse[],
    category: CategoryDrinkResponse | null,
    iba: IbaDrinkResponse,
    alcoholic: boolean,
    glass: GlassDrinkResponse,
    instructions: InstructionsDrinkResponse[],
    drinkThumb: string | null,
    ingredients: IngredientDrinkResponse[],
    measures: string[],
    imageAttribution: string | null,
    imageSource: string | null,
}

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id)
    const drink = await client.drink.findFirst({
        where: {
            id: id
        },
        include: {
            tags: true,
            category: true,
            iba: true,
            glass: true,
            instructions: true,
            ingredients: true,
        }
    })

    if (drink === null) {
        throw createError({
            statusCode: 404,
            statusMessage: "Not Found"
        })
    }

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
