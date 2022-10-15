import { sql_client } from "~~/server/utils/db/main"

export default defineEventHandler(async () => {
    return await sql_client.user.deleteMany({ })
})