import UserService from '../../services/users/User'
import { jwtOptions } from '../../middlewares/passport'
import RefreshTokenService from '../../services/auth/RefreshToken'
// import hashPassword from '../../utils/hashPassword'
import jwt from 'jsonwebtoken'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(
                Number(request.params.id)
            )
            response.send(user)

        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request
          try {
              const user = await this.userService.create(body)
              response.status(201).send(user)
          } catch (error: any) {
              response.status(400).send({ "error": error.message })
          }
      }

    me = async (request: any, response: any) => {
        response.send(request.user)
    }

    auth = async (request: any, response: any) => {
        const { body } = request

        const { email, password } = body

        try {
            const { user, checkPassword } = await this.userService.checkPassword(email, password)
            
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
                const user = await this.userService.getById(userId)

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

    update = async (request: any, response: any) => {
        try {
            const { body } = request
            const user = await this.userService.update(request.params.id, body)
            response.send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
    
    delete = async (request: any, response: any) => {
        try {
            const id = Number(request.params.id)
            await this.userService.delete(id)
            response.status(200).send({ "status": `Successfully deleted user with id ${id}` })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    validateToken = async (request: any, response: any) => {
        const { body } = request
        const { accessToken } = body
        try {
            const payload = jwt.verify(accessToken, jwtOptions.secretOrKey)
            // @ts-ignore
            const user = await this.userService.getByID(payload.id)
            response.send({'valid': true, 'user': user})
        } catch (error: any) {
            response.status(401).send({'valid': false})
        }
    }
}

export default UserController