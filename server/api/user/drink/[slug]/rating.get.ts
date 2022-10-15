import { Prisma, RatingValue } from "@prisma/client"
import { sql_client } from "~~/server/utils/db/main"

export type SingleRating = {
    username: string,
    value: RatingValue,
}

export type RatingResponse = {
    average: number,
    singles: SingleRating[]
}

export function ratingToNumber(rating:RatingValue): number {
    switch (rating) {
        case RatingValue.One:
            return 1.0 
        case RatingValue.Two:
            return 2.0
        case RatingValue.Three:
            return 3.0
        case RatingValue.Four:
            return 4.0
        case RatingValue.Five:
            return 5.0
    } 
}

export default defineEventHandler(async (event) => {
    const drink_slug: string = event.context.params.slug
    const ratings: SingleRating[] = await sql_client.rating.findMany({
        where: {
            drink: {
                slug: drink_slug
            }
        },
        include: {
            user: true
        }
    }).then((e) => e.map((r) => {
        return {
            username: r.user.username,
            value: r.value
        }
    }))

    const count = ratings.length
    let acc = 0.0
    ratings
        .forEach((r) => {
            acc += ratingToNumber(r.value)
        })

    const average = acc / count
    
    const ret: RatingResponse = {
        average,
        singles: ratings
    }

    
    return ret
})