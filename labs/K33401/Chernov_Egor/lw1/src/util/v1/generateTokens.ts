import * as dotenv from "dotenv"
import jwt from "jsonwebtoken"

export default (userId: string, date: number, refreshToken="", onlyAccessToken=false) => {
    if (!refreshToken && !onlyAccessToken) {
        refreshToken = jwt.sign(
            {sub: userId, iss: "cryptocoin", iat: date},
            process.env.SECRET_KEY,
            {algorithm: "HS512", expiresIn: "30d"}
        )
    }
    return {
        accessToken: jwt.sign(
            {sub: userId, iss: "cryptocoin", iat: date},
            process.env.SECRET_KEY,
            {algorithm: "HS512", expiresIn: "30m"}
        ),
        refreshToken: refreshToken
    }
}