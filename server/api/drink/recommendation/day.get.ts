import { getDrinkFromId } from "~~/server/utils/drink_from_seed"


const MARTINI_ID: number = 116
const NEGRONI_ID: number = 4
const SEX_ON_THE_BEACH_ID: number = 222
const WHITE_RUSSIAN_ID: number = 178

const DRINK_OF_THE_DAY_COL: number[] = [MARTINI_ID, NEGRONI_ID, SEX_ON_THE_BEACH_ID, WHITE_RUSSIAN_ID]

export default defineEventHandler(async () => {
    const today = new Date()
    const millis = Math.round(today.valueOf())
    const seconds = Math.round(millis / 1000)
    const minutes = Math.round(seconds / 60)
    const hours = Math.round(minutes / 60)
    const days = Math.round(hours / 24)

    const idx = days % DRINK_OF_THE_DAY_COL.length
    const id = DRINK_OF_THE_DAY_COL[idx]

    return await getDrinkFromId(id)
})