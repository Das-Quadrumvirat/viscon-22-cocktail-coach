import { Crypto } from "@peculiar/webcrypto"
import { sql_client } from "~~/server/utils/db/main"

export type RegisterUserData = {
    username: string,
    password: string
}

const crypto = new Crypto()

export default defineEventHandler(async (event) => {
    const body: RegisterUserData = await useBody(event)

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

    const created_user = await sql_client.user.create({
        data: {
            username: body.username,
            password_hash: Buffer.from(password_hash) 
        }
    })

    setCookie(event, "user_id", `${created_user.id}`, {
        httpOnly: false
    })


    setCookie(event, "username", created_user.username,  {
        httpOnly: false
    })
    await sendRedirect(event, "/user/loggedin")
})