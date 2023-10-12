import User from '../models/user.model'
import UserService from '../services/user.service'
import jwt from 'jsonwebtoken'
import {jwtOptions} from '../middlewares/passport'
import TokenService from '../services/token.service'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const user: User | Error = await this.userService.getById(
                Number(request.params.id)
            )
            response.send(user)
        } catch (error: any) {
            response.status(404).send({"error": error.message})
        }
    }

    post = async (request: any, response: any) => {
        const {body} = request
        try {
            const user: User | Error = await this.userService.create(body)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }

    me = async (request: any, response: any) => {
        response.send(request.user)
    }

    auth = async (request: any, response: any) => {
        const {body} = request
        const {email, password} = body
        try {
            const {user, checkPassword} = await this.userService.checkPassword(email, password)
            if (checkPassword) {
                const payload = {id: user.id}
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)
                const tokenService = new TokenService(user)
                const token = await tokenService.generateToken()
                response.send({accessToken})
            } else {
                throw new Error('Login or password is incorrect!')
            }
        } catch (e: any) {
            response.status(401).send({"error": e.message})
        }
    }

    refreshToken = async (request: any, response: any) => {
        const {body} = request
        const {token} = body
        const tokenService = new TokenService()
        try {
            const {userId, isExpired} = await tokenService.isTokenExpired(token)
            if (!isExpired && userId) {
                const user = await this.userService.getById(userId)
                const payload = {id: user.id}
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)
                const refreshTokenService = new TokenService(user)
                const refreshToken = await refreshTokenService.generateToken()
                response.send({accessToken, refreshToken})
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e) {
            response.status(401).send({'error': 'Invalid credentials'})
        }
    }
}

export default UserController