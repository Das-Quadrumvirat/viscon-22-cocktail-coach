import { Crypto } from "@peculiar/webcrypto"
import { sql_client } from "~~/server/utils/db/main"

export type LoginUserData = {
    username: string,
    password: string
}

const crypto = new Crypto()

export default defineEventHandler(async (event) => {
    const body: LoginUserData = await useBody(event)

    const utf8Encode = new TextEncoder()
    const password_data = utf8Encode.encode(body.password)
    const password_hash = await crypto.subtle.digest('SHA-256', password_data)

    try {
        const found_user = await sql_client.user.findUniqueOrThrow({
            where: {
                username: body.username
            }
        })

        if (found_user.password_hash.compare(Buffer.from(password_hash)) != 0) {
            throw new Error("Password was not correct");
        }
    } catch (e) {
        await sendRedirect(event, "/user/loginerror")
    }

    setCookie(event, "user_id", `${found_user.id}`, {
        httpOnly: false
    })

    setCookie(event, "username", found_user.username, {
        httpOnly: false,
    })

    await sendRedirect(event, "/user/loggedin")
})