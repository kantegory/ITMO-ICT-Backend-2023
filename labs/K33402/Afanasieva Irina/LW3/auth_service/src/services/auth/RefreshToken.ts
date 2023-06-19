import RefreshToken from '../../models/auth/RefreshToken'
import User from '../../models/users/User'
import {randomUUID} from 'crypto'
import {jwtConfig} from '../../configs';


class RefreshTokenService {
    generateRefreshToken = async (userId: number): Promise<string> => {
        const token = randomUUID()
        await RefreshToken.create({token, userId})
        return token
    }

    isRefreshTokenExpired = async (token: string): Promise<{ userId: number | null, isExpired: boolean }> => {
        const refreshToken = await RefreshToken.findOne({where: {token}})
        if (refreshToken) {
            const tokenData = refreshToken.toJSON()
            const currentDate = new Date()
            const timeDelta = currentDate.getTime() - tokenData.createdAt.getTime()
            if (timeDelta > 0 && timeDelta < jwtConfig.refreshTokenLifetime) {
                return {userId: tokenData.userId, isExpired: false}
            }
            return {userId: null, isExpired: true}
        }
        return {userId: null, isExpired: true}
    }
}

export default RefreshTokenService
