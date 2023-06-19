import * as dotenv from "dotenv"
import jwt from "jsonwebtoken"


export default (userId: string, refreshToken="") => {
    if (!refreshToken) {
        refreshToken = jwt.sign(
            {sub: userId, iss: "cryptocoin"},
            process.env.SECRET_KEY,
            {algorithm: "HS512", expiresIn: "7d"}
        )
    }
    return {
        accessToken: jwt.sign(
            {sub: userId, iss: "cryptocoin"},
            process.env.SECRET_KEY,
            {algorithm: "HS512", expiresIn: "10m"}
        ),
        refreshToken: refreshToken
    }
}