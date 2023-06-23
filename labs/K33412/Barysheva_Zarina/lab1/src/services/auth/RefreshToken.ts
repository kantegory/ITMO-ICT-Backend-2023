import RefreshToken from "../../models/auth/RefreshToken"
import User from "../../models/users/User"
import { randomUUID } from "crypto"
import configParser from "../../utils/configParser"
import path from 'path'

const configPath = path.resolve(__dirname, "../../configs/settings.ini")
const config: any = configParser(configPath, "JWT")

class RefreshTokenService {
    private user: User | null

    constructor(user: User | null = null) {
        this.user = user
    }

    generateRefreshToken = async () : Promise<string> => {
        const token = randomUUID()

        const userId = this.user?.id

        await RefreshToken.create({ token, userId })

        return token
    }

    isRefreshTokenExpired = async (token: string) : Promise<{ userId: number|null, isExpired: boolean }> => {
        const refreshToken = await RefreshToken.findOne({ where: { token } })

        if (refreshToken) {
            const tokenData = refreshToken.toJSON()

            const currentDate = new Date()
            const timeDelta = currentDate.getTime() - tokenData.createdAt.getTime()

            if (timeDelta > 0 && timeDelta < config.refreshTokenLifetime) {
                return { userId: tokenData.userId, isExpired: false }
            }

            return { userId: null, isExpired: true }
        }

        return { userId: null, isExpired: true }
    }
}

export default RefreshTokenService
