import User from '../../models/users/User'
import UserService from '../../services/users/User'
import APIError from '../../errors/APIError'
import RefreshTokenService from '../../services/auth/RefreshToken'
import {jwtConfig} from '../../configs'
import jwt from 'jsonwebtoken'

class UserController {
    private userService: UserService
    private refreshTokenService: RefreshTokenService

    constructor() {
        this.userService = new UserService()
        this.refreshTokenService = new RefreshTokenService()
    }

    get = async (request: any, response: any) => {
        try {
            const user: User | APIError = await this.userService.getById(Number(request.params.id))
            response.send(user)
        } catch (error: any) {
            response.status(404).send({'detail': error.message})
        }
    }

    post = async (request: any, response: any) => {
        const {body} = request
        try {
            const user: User | APIError = await this.userService.create(body)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({'detail': error.message})
        }
    }

    put = async (request: any, response: any) => {
        const {body} = request
        try {
            const updatedUser: User | APIError = await this.userService.update(Number(request.params.id), body)
            response.status(200).send(updatedUser)
        } catch (error: any) {
            response.status(400).send({'detail': error.message})
        }
    }

    login = async (request: any, response: any) => {
        const {body} = request
        const {email, password} = body
        try {
            const {user, checkPassword} = await this.userService.checkPassword(email, password)

            if (checkPassword) {
                const payload = {id: user.id}
                const accessToken = jwt.sign(payload, jwtConfig.secret)
                const refreshToken = await this.refreshTokenService.generateRefreshToken(user.id)

                response.send({accessToken, refreshToken})
            } else {
                response.status(400).send({'detail': 'Invalid credentials'})
            }
        } catch (e: any) {
            response.status(400).send({'detail': e.message})
        }
    }

    refreshToken = async (request: any, response: any) => {
        const {body} = request
        const {refreshToken} = body
        const refreshTokenService = new RefreshTokenService()
        try {
            const {userId, isExpired} = await refreshTokenService
                .isRefreshTokenExpired(refreshToken)

            if (!isExpired && userId) {
                try {
                    const user = await this.userService.getById(userId)
                    const payload = {id: user.id}
                    const accessToken = jwt.sign(payload, jwtConfig.secret)
                    const refreshToken = await this.refreshTokenService.generateRefreshToken(user.id)
                    response.send({accessToken, refreshToken})
                } catch (e: any) {
                    response.status(400).send({'detail': e.message})
                }
            } else {
                response.status(401).send({'error': 'Invalid credentials'})
            }
        } catch (e: any) {
            response.status(401).send({'error': e.message})
        }
    }

    validateToken = async (request: any, response: any) => {
        const {body} = request
        const {accessToken} = body
        try {
            const payload = jwt.verify(accessToken, jwtConfig.secret)
			// @ts-ignore
			const user = await this.userService.getById(payload.id)
            response.send({'valid': true, 'user': user})
        } catch (e: any) {
            response.status(401).send({'valid': false})
        }
    }
}

export default UserController
