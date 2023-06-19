import {Repository} from "typeorm"
import {RefreshToken} from "../entity/RefreshToken"
import {AppDataSource} from "../data-source"


class RefreshTokenService {
    private refreshTokenRepository: Repository<RefreshToken>

    constructor() {
        this.refreshTokenRepository = AppDataSource.getRepository(RefreshToken)
    }

    async get(user) {
        const refreshToken = await this.refreshTokenRepository.findOne({
            where: {
                user: user
            }})
        if (refreshToken) {
            return refreshToken.token
        }
        throw new Error("Refresh token does not exist for current user")
    }

    async create(user: any, token: string) {
        const refreshToken = new RefreshToken()
        refreshToken.token = token
        refreshToken.user = user.id
        await this.refreshTokenRepository.save(refreshToken)
        return token
    }

    async update(user: any, refreshToken: string) {
        await this.refreshTokenRepository.update({user: user}, {token: refreshToken})
        return refreshToken
    }
}

export default RefreshTokenService