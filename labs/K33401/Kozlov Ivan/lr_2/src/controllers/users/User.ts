import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middlewares/passport'
import RefreshTokenService from '../../services/auth/RefreshToken'
import UserService from '../../services/users/User'
import hashPassword from '../../utils/hashPassword'

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

    hello = async (request: any, response: any) => {
        const html = '<html><body><h1>Hello World!</h1></body></html>';
        response.send(html)
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

                response.send({ 'Answer' : `You successfully logged in as ${user.firstName} ${user.lastName}`, 
                accessToken, refreshToken })
            } else {
                throw new Error('Login or password is incorrect!')
            }
        } catch (e: any) {
            response.status(401).send({ "error": "Can not login" })
        }
    }

    refreshToken = async (request: any, response: any) => {
        const { body } = request

        const refreshToken = body.refreshToken

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

    create = async (request: any, response: any) => {
        try {
            const { body } = request
            body.password = hashPassword(body.password)

            const user = await this.userService.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const refreshToken = request.headers["refreshtoken"]
        
        if (!refreshToken) {
            response.status(400).send({ "error": "Missing refreshToken header", "req": request.headers })
            return
        }
        
        const refreshTokenService = new RefreshTokenService() 
        const { userId, isExpired } = await refreshTokenService.isRefreshTokenExpired(refreshToken)
    
        if(isExpired){
            response.status(401).send({ "error": "Unauthorized, u need new refreshToken" })
            return
        }
        
        try {
            const user = await this.userService.update(Number(userId), body)
            response.send(user)
        } catch (error: any) {
            response.status(400).send({ "error": "incorrect token"})
        }
    }
    
    delete = async (request: any, response: any) => {
        const refreshToken = request.headers["refreshtoken"];
        if (!refreshToken) {
            response.status(400).send({ "error": "Missing refreshToken header" });
            return;
        }
        const refreshTokenService = new RefreshTokenService();
        const { userId, isExpired } = await refreshTokenService.isRefreshTokenExpired(refreshToken);
        if(isExpired){
            response.status(401).send({ "error": "Unauthorized, u need new refreshToken" });
            return;
        }
        try {
            await this.userService.delete(Number(userId));
            response.status(200).send({ "status": `Successfully deleted user with id ${userId}` });
        } catch (error: any) {
            response.status(400).send({ "error": "Incorrect token" });
        }
    }
    
    
    
    
}

export default UserController