import TokenModel from "../models/tokenModel"
import UserModel from "../models/userModel"
import { randomUUID } from "crypto"

class TokenService {
    private user: UserModel | null

    constructor(user: UserModel | null = null) {
        this.user = user
    }

    generateRefreshToken = async () : Promise<string> => {
        const token = randomUUID()
        const userId = this.user?.id
        await TokenModel.create({ token, userId })
        return token
    }

    isRefreshTokenExpired = async (token: string) : Promise<{ userId: number|null, isExpired: boolean }> => {
        const refreshToken = await TokenModel.findOne({ where: { token } })
        if (refreshToken) {
            const tokenData = refreshToken.toJSON()
            const currentDate = new Date()
            const timeDelta = currentDate.getTime() - tokenData.createdAt.getTime()
            if (timeDelta > 0 && timeDelta < parseInt(process.env.REFRESH_TOKEN_LIFETIME!, 10)) {
                return { userId: tokenData.userId, isExpired: false }
            }
            return { userId: null, isExpired: true }
        }
        return { userId: null, isExpired: true }
    }
}

export default TokenService
