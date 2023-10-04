import {UserService} from "../services/users/userService";
import User from "../models/users/User";
import {UserError} from "../helpers/errors/userError";
import {Request, Response} from "express";
import jwt from "jsonwebtoken"
import {jwtOptions} from "../middlewares/passport";
import RefreshTokenService from "../services/auth/RefreshToken"

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    post = async (request: Request, response: Response) => {
        const {body} = request
        try {

            const user: User | UserError = await this.userService.createUser(body)
            response.status(201).json(user)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    get = async (request: Request, response: Response) => {
        try {
            const user: User | UserError = await this.userService.getById(+request.params.id)
            response.status(200).json(user)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }
    getAll = async (request: Request, response: Response) => {
        const users: User[] = await this.userService.getAllUsers()
        response.status(200).json(users)
    }
    getByUsername = async (request: Request, response: Response) => {
        try {
            const user: User | UserError = await this.userService.getByUsername(request.params.username)
            response.status(200).json(user)
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    delete = async (request: Request, response: Response) => {
        try {
            await this.userService.deleteUser(+request.user?.id)
            response.status(200).json({message: "User deleted"})
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    auth = async (request: Request, response: Response) => {
        try {
            const {email, password} = request.body
            const {user, checkPassword} = await this.userService.checkPassword(email, password)

            if (checkPassword) {
                const payload = {id: user.id}
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)
                const refreshTokenService = new RefreshTokenService(user)
                const refreshToken = await refreshTokenService.generateRefreshToken()
                response.send({accessToken, refreshToken})
            } else {
                response.status(404).json({error: "Wrong email or password"})
            }
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }

    refreshToken = async (request: Request, response: Response) => {
        const {body} = request
        const {refreshToken} = body
        const refreshTokenService = new RefreshTokenService()

        try {
            const {userId, isExpired} = await refreshTokenService
                .isRefreshTokenExpired(refreshToken)

            if (!isExpired && userId) {
                const user = await this.userService.getById(userId)
                const payload = {id: user.id}
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)
                const refreshTokenService = new RefreshTokenService(user)
                const refreshToken = await refreshTokenService.generateRefreshToken()
                response.send({accessToken, refreshToken})
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e) {
            response.status(401).send({'error': 'Invalid credentials'})
        }
    }

    me = async (request: Request, response: Response) => {
        response.send(request.user);
    }

    getPosts = async (request: Request, response: Response) => {
        try {
            if (request.user?.id) {
                const body = JSON.stringify({'userId': request.user?.id})
                const posts = await fetch(process.env.POSTSAPI!, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: body
                })
                const res = await posts.json()
                response.status(200).json(res)
            } else {
                throw new UserError('Unauthorized')
            }
        } catch (error: any) {
            response.status(404).json({error: error.message})
        }
    }
}
