import { Crypto } from "@peculiar/webcrypto"
import { sql_client } from "~~/server/utils/db/main"

export type RegisterUserData = {
    username: string,
    password: string
}

const crypto = new Crypto()

const validChars = new Set(["a", "b", "c"
    , "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-"])

export default defineEventHandler(async (event) => {
    const body: RegisterUserData = await useBody(event)

    for (let i = 0; i < body.username.length; i++) {
        if (!validChars.has(body.username.charAt(i))) {
            await sendRedirect(event, "/user/loginerror")
        }
    }

    console.log("Body => ", body)
    const utf8Encode = new TextEncoder()
    const password_data = utf8Encode.encode(body.password)
    const password_hash = await crypto.subtle.digest('SHA-256', password_data)

    const user_exists = await sql_client.user.findUnique({
        where: {
            username: body.username
        }
    })
    if (user_exists) {
        return {
            code: 400,
            error: "Already present"
        }
    }
    let created_user;

    try {
        created_user = await sql_client.user.create({
            data: {
                username: body.username,
                password_hash: Buffer.from(password_hash)
            }
        })
    } catch (e) {
        await sendRedirect(event, "/user/loginerror")
    }

    setCookie(event, "user_id", `${created_user.id}`, {
        httpOnly: false
    })


    setCookie(event, "username", created_user.username, {
        httpOnly: false
    })
    await sendRedirect(event, "/user/loggedin")
})