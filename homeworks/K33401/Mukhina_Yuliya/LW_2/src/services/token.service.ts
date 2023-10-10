import Token from "../models/token.model"
import User from "../models/user.model"
import {randomUUID} from "crypto"

class TokenService {
    private user: User | null

    constructor(user: User | null = null) {
        this.user = user
    }

    generateToken = async (): Promise<string> => {
        const token = randomUUID()
        const userId = this.user?.id
        await Token.create({token, userId})
        return token
    }

    isTokenExpired = async (token: string): Promise<{ userId: number | null, isExpired: boolean }> => {
        const tokenInstance = await Token.findOne({where: {token}})
        if (tokenInstance) {
            const tokenData = tokenInstance.toJSON()
            const currentDate = new Date()
            const timeDelta = currentDate.getTime() - tokenData.createdAt.getTime()
            if (timeDelta > 0 && timeDelta < parseInt(process.env.REFRESH_TOKEN_LIFETIME!, 10)) {
                return {userId: tokenData.userId, isExpired: false}
            }
            return {userId: null, isExpired: true}
        }
        return {userId: null, isExpired: true}
    }
}

export default TokenService