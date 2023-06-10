import UserRepository from '../../services/users/User'
import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middlewares/passport'
import RefreshTokenService from '../../services/auth/RefreshToken'

class UserController {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    get = async (request: any, response: any) => {
        try {
            const user = await this.userRepository.getById(
                Number(request.params.id)
            )

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        try {
            const { body } = request

            if (body.id) {
                const user = await this.userRepository.getById(body.id)

                if (!request.user || request.role >= user.role) {
                    throw new Error('Not authorized')
                }

                const updatedUser = await this.userRepository.updateById(body.id, body)
                response.status(200).send(updatedUser)
            } else {
                const user = await this.userRepository.create(body)
                response.status(201).send(user)
            }
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const userToDelete = await this.userRepository.getById(
                Number(request.params.id)
            )

            if (!userToDelete) {
                throw new Error('User not found')
            }

            if (!request.user || userToDelete.role <= request.user) {
                throw new Error('Not authorized')
            }

            const result = await this.userRepository.deleteById(
                Number(request.params.id)
            )

            response.status(result ? 200 : 400).send({});
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    me = async (request: any, response: any) => {
        response.send(request.user)
    }

    auth = async (request: any, response: any) => {
        const { body } = request

        const { email, password } = body

        try {
            const { user, checkPassword } = await this.userRepository.checkPassword(email, password)

            if (checkPassword) {
                const payload = { id: user.id }

                console.log('payload is', payload)

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                const refreshTokenService = new RefreshTokenService(user)

                const refreshToken = await refreshTokenService.generateRefreshToken()

                response.send({ accessToken, refreshToken })
            } else {
                throw new Error('Login or password is incorrect!')
            }
        } catch (e: any) {
            response.status(401).send({ "error": e.message })
        }
    }

    refreshToken = async (request: any, response: any) => {
        const { body } = request

        const { refreshToken } = body

        const refreshTokenService = new RefreshTokenService()

        try {
            const { userId, isExpired } = await refreshTokenService
                .isRefreshTokenExpired(refreshToken)

            if (!isExpired && userId) {
                const user = await this.userRepository.getById(userId)

                const payload = { id: user.id }

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                const refreshTokenService = new RefreshTokenService(user)

                const refreshToken = await refreshTokenService.generateRefreshToken()

                response.send({ accessToken, refreshToken })
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e) {
            response.status(401).send({ 'error': 'Invalid credentials' })
        }
    }
}

export default UserController