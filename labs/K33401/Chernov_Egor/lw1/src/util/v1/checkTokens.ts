import * as dotenv from "dotenv"
import jwt from "jsonwebtoken"

export default (token: string) => {
    const status = {
        valid: true,
        userId: ""
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            status.valid = false
        }
        status.userId = decoded.sub.toString()
    })
    return status
}