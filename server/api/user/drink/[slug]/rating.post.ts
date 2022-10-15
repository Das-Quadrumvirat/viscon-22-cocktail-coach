import { RatingValue } from "@prisma/client";
import { sql_client } from "~~/server/utils/db/main";

export type NewRatingBody = {
    val: RatingValue
}

export default defineEventHandler(async (event) => {
    const rating_body: NewRatingBody = await useBody(event)
    console.log(rating_body)
    const user_id = parseInt(getCookie(event, "user_id"))
    if (user_id === NaN) {
        throw new Error("Log in");
    }
    const drink_slug: string = event.context.params.slug
    let value: RatingValue = RatingValue.One

    if (rating_body.val === 'One') {
        value = RatingValue.One
    } else if (rating_body.val == 'Two') {
        value = RatingValue.Two
    } else if (rating_body.val == 'Three') {
        value = RatingValue.Three
    } else if (rating_body.val == 'Four') {
        value = RatingValue.Four
    } else if (rating_body.val == 'Five') {
        value = RatingValue.Five
    }

    const rating = await sql_client.rating.create({
        data: {
            value: value,
            drink: {
                connect: {
                    slug: drink_slug
                },
            },
            user: {
                connect: {
                    id: user_id
                }
            }
        },
        include: {
            drink: true,
            user: true,
        }
    })

    return rating
})