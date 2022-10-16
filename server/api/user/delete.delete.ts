import { sql_client } from "~~/server/utils/db/main"

export default defineEventHandler(async () => {
    await sql_client.rating.deleteMany({ })
    return await sql_client.user.deleteMany({ })
})