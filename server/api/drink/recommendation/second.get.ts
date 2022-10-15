import { getDrinkFromSeed } from "~~/server/utils/drink_from_seed"

export default defineEventHandler(async () => {
    const today = new Date()
    const millis = Math.round(today.valueOf())
    const seconds = Math.round(millis / 1000)
    return await getDrinkFromSeed(seconds)
})