import { getDrinkFromSeed } from "~~/server/utils/drink_from_seed"

export default defineEventHandler(async () => {
    const today = new Date()
    const millis = Math.round(today.valueOf())
    const seconds = Math.round(millis / 1000)
    const minutes = Math.round(seconds / 60)
    const hours = Math.round(minutes / 60)
    const days = Math.round(hours / 24)
    const week = Math.round(days / 7)
    return await getDrinkFromSeed(week)
})