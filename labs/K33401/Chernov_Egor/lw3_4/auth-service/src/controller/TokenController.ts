import { Request, Response } from "express"
import checkToken from "../util/checkToken"
import generateTokens from "../middleware/generateTokens"


class TokenController {
    update = async (request: Request, response: Response) => {
        try {
            const refreshToken = request.headers.authorization!.split(" ")[1]
            const decoded = checkToken(refreshToken)
            if (decoded.isExpired) {
                return response.status(401).send("Refresh token was expired")
            }
            const userId = decoded.payload!.sub.toString()
            const tokens = generateTokens(userId, refreshToken)
            console.log("Update the access token")
            response.status(200).send(tokens)
        } catch (error) {
            response.status(500).send({ error: error.message })
        }

    }
}

export default TokenController