import { getDrinkFromId } from "~~/server/utils/drink_from_seed"

export default defineEventHandler(async () => {
    const LONG_ISLAND_ICE_TEA_ID: number = 3
    return await getDrinkFromId(LONG_ISLAND_ICE_TEA_ID)
})