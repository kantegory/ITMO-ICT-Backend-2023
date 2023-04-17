import dotenv from "dotenv"
import RefreshToken from '../../database/models/auth/RefreshToken'
import User from '../../database/models/users/User'
import { randomUUID } from "crypto"

dotenv.config()

class RefreshTokenService {
    private user: User | null
    constructor(user: User | null = null) {
        this.user = user
    }
    generateNewRefreshToken = async (): Promise<string> => {
        const token = randomUUID()

        const userId = this.user?.id

        await RefreshToken.create({ token, userId })

        return token
    }

    isRefreshTokenEnded = async (token: string): Promise<{ userId: number | null, isExpired: boolean }> => {
        const refreshToken = await RefreshToken.findOne({ where: { token } })

        if (refreshToken) {
            const tokenData = refreshToken.toJSON()

            const currentDate = new Date()
            const timeDelta = currentDate.getTime() - tokenData.createdAt.getTime()

            if (timeDelta > 0 && timeDelta < parseInt(process.env.REFRESH_TOKEN_LIFETIME!)) {
                return { userId: tokenData.userId, isExpired: false }
            }

            return { userId: null, isExpired: true }
        }

        return { userId: null, isExpired: true }
    }
}

export default RefreshTokenService