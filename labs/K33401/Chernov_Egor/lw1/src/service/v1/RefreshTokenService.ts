import {Repository} from "typeorm"
import {RefreshToken} from "../../entity/RefreshToken"
import {AppDataSource} from "../../data-source"
import generateTokens from "../../util/v1/generateTokens"
import checkTokens from "../../util/v1/checkTokens"

class RefreshTokenService {
    private refreshTokenRepository: Repository<RefreshToken>

    constructor() {
        this.refreshTokenRepository = AppDataSource.getRepository(RefreshToken)
    }

    async get(user) {
        try {
            const refreshToken = await this.refreshTokenRepository.findOne({
                where: {
                    user: user
                }})
            if (refreshToken) {
                const { isExpired } = checkTokens(refreshToken.token)
                if (isExpired) {
                    return generateTokens(user.id)
                }
                return generateTokens(user.id, refreshToken.token)
            }
            throw "Error of getting tokens"
        } catch (e: any) {
            console.log(e)
        }
    }

    async create(user: any) {
        try {
            const tokens = generateTokens(user.id)
            const refreshToken = new RefreshToken()
            refreshToken.token = tokens.refreshToken
            refreshToken.user = user
            await this.refreshTokenRepository.save(refreshToken)
            return tokens
        } catch (e: any) {
            console.log(e)
            throw "Error of creating tokens"
        }
    }
}

export default RefreshTokenService