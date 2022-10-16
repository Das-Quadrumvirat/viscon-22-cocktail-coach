import { sql_client } from "~~/server/utils/db/main"

export default defineEventHandler(async (event) => { 
    console.log(getCookie(event, 'user_id'))
    const user_id = parseInt(getCookie(event, "user_id"))
    if (!user_id) {
        await sendRedirect(event, "/user/login")
        return
    }
    
    const made_cocktails = await sql_client.user.findUniqueOrThrow({
        where: {
            id: user_id,
        },
        include: {
            made_cocktails: true
        }
    })
    return made_cocktails.made_cocktails
})