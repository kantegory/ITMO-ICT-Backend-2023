import { Request, Response } from "express"
import RefreshTokenService from "../../service/v1/RefreshTokenService"
import checkToken from "../../util/v1/checkToken"
import generateTokens from "../../middleware/v1/generateTokens"

class TokenController {
    private refreshTokenService: RefreshTokenService

    constructor() {
        this.refreshTokenService = new RefreshTokenService()
    }

    update = async (request: Request, response: Response) => {
        const refreshToken = request.headers.authorization.split(" ")[1]
        const decoded = checkToken(refreshToken)
        if (decoded.isExpired) {
            return response.send("Refresh token was expired")
        }
        const userId = decoded.payload.sub.toString()
        const tokens = generateTokens(userId, refreshToken)
        console.log("Update the access token")
        return response.send(tokens)
    }
}

export default TokenController