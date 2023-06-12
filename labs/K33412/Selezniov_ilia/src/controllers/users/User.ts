import User from '../../models/users/User'
import UserService from '../../services/users/User'
import APIError from '../../errors/APIError'
import jwt from 'jsonwebtoken'
import {jwtOptions} from '../../middlewares/passport'
import RefreshTokenService from '../../services/auth/RefreshToken'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    // get = async (request: any, response: any) => {
    //     try {
    //         const user: User | APIError = await this.userService.getById(
    //             Number(request.params.id)
    //         )
    //         response.send(user)
    //     } catch (error: any) {
    //         response.status(404).send({'detail': error.message})
    //     }
    // }

    post = async (request: any, response: any) => {
        const {body} = request
        try {
            const user: User | APIError = await this.userService.create(body)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({'detail': error.message})
        }
    }

    // Get only allowed for myself
    get = async (request: any, response: any) => {
        const {user} = request
        if (user) {
            response.send(user)
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }

    // Put only allowed for myself
    put = async (request: any, response: any) => {
        const {body, user} = request
        if (user) {
            try {
                const updatedUser: User | APIError = await this.userService.update(user.id, body)
                response.status(200).send(updatedUser)
            } catch (error: any) {
                response.status(400).send({'detail': error.message})
            }
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }

    login = async (request: any, response: any) => {
        const {body} = request
        const {email, password} = body
        try {
            const {user, checkPassword} = await this.userService.checkPassword(email, password)

            if (checkPassword) {
                const payload = {id: user.id}
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)
                const refreshTokenService = new RefreshTokenService(user)
                const refreshToken = await refreshTokenService.generateRefreshToken()

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
                    // @ts-ignore
                    const payload = {id: user.id}
                    const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)
                    // @ts-ignore
                    const refreshTokenService = new RefreshTokenService(user)
                    const refreshToken = await refreshTokenService.generateRefreshToken()
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
}

export default UserController
