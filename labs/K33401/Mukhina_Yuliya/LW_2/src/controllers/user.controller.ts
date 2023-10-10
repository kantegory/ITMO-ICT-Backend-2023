import User from '../models/user.model'
import UserService from '../services/user.service'
import jwt from 'jsonwebtoken'
import {jwtOptions} from '../middlewares/passport'
import TokenService from '../services/token.service'
import RegistrationService from "../services/registration.service";

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
        try {
            const user = request.user
            const registrationService = new RegistrationService()
            const registrations = await registrationService.getAllByUser(request.user.id)
            response.send({"user": user, "registrations": registrations})
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }

    unregister = async (request: any, response: any) => {
        try {
            const registrationService = new RegistrationService()
            await registrationService.delete(request.params.id, request.user.id)
            response.send("Success")
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }

    register = async (request: any, response: any) => {
        try {
            const registrationService = new RegistrationService()
            await registrationService.create(request.params.id, request.user.id)
            response.send("Success")
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
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