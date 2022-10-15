import { client } from "~~/server/utils/db/main"

export default defineEventHandler(async () => {
    const ingredients_index = client.index('ingredients')
    return {
        count: await ingredients_index.getStats().then((s) => s.numberOfDocuments)
    }
})