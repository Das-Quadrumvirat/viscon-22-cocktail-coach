import { client } from "../utils/db/main"
import { DrinkResponse } from "./drink/[id].get"


export default defineEventHandler(async () => {
    const drinks: DrinkResponse[] = await client.drink.findMany({
        include: {
            tags: true,
            category: true,
            iba: true,
            glass: true,
            instructions: true,
            ingredients: true
        }
    })
    
    return drinks
})