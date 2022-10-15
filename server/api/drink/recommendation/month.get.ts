import { getDrinkFromId, getDrinkFromSeed } from "~~/server/utils/drink_from_seed"

export default defineEventHandler(async () => {
    const MOSCOW_MULE_ID = 10
    return await getDrinkFromId(MOSCOW_MULE_ID)
})