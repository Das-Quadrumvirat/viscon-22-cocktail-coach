import { sql_client } from "~~/server/utils/db/main"

export default defineEventHandler(async (event) => {
    const user_id = parseInt(getCookie(event, "user_id"))
    if (user_id === undefined || user_id === NaN) {
        await sendRedirect(event, "/user/login")
    }
    const drink_slug: string = event.context.params.slug
    const drink_to_meili = await sql_client.meiliDrink.findUniqueOrThrow({
        where: {
            slug: drink_slug
        }
    })
    const connect = await sql_client.user.update({
        where: {
            id: user_id 
        },
        data: {
            made_cocktails: {
                connect: {
                    id: drink_to_meili.id,
                }
            }
        },
        include: {
            made_cocktails: true
        }
    })
    return connect.made_cocktails
})