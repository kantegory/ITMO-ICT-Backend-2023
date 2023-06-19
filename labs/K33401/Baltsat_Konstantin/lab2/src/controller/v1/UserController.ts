import { Request, Response } from "express"
import UserService from "../../service/v1/UserService"
import PortfolioService from "../../service/v1/PortfolioService"
import RefreshTokenService from "../../service/v1/RefreshTokenService"
import checkToken from "../../util/v1/checkToken"
import generateTokens from "../../middleware/v1/generateTokens"

class UserController {
    private userService: UserService
    private portfolioService: PortfolioService
    private refreshTokenService: RefreshTokenService

    constructor() {
        this.userService = new UserService()
        this.portfolioService = new PortfolioService()
        this.refreshTokenService = new RefreshTokenService()
    }

    getAllUsers = async (request: Request, response: Response) => {
        try {
            const users = await this.userService.getAll()
            if (users.length !== 0) {
                response.status(200).send(users)
            } else {
                response.status(204).send(users)
            }
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }

    getUser = async (request: Request, response: Response) => {
        try {
            const accessToken = request.headers.authorization.split(" ")[1]
            const decoded = checkToken(accessToken)
            if (decoded.isExpired) {
                return response.status(401).send("Access token was expired")
            }
            const userId = decoded.payload.sub.toString()
            const user = await this.userService.get(userId)
            response.status(200).send(user)
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }

    postSignupUser = async (request: Request, response: Response) => {
        try {
            const { body } = request
            const user = await this.userService.create(body)
            const tokens = generateTokens(user.id)
            await this.refreshTokenService.create(user, tokens.refreshToken)
            console.log("Create access and refresh tokens")
            response.status(201).send(tokens)
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }

    postLoginUser = async (request: Request, response: Response) => {
        try {
            const { body } = request
            const { email, password } = body
            const user = await this.userService.login(email, password)
            const refreshToken = await this.refreshTokenService.get(user)
            const { isExpired } = checkToken(refreshToken)
            if (isExpired) {
                const tokens = generateTokens(user.id)
                await this.refreshTokenService.update(user, tokens.refreshToken)
                console.log("Update refresh token and create access token")
                return response.status(200).send(tokens)
            }
            const tokens = generateTokens(user.id, refreshToken)
            console.log("Create access token")
            response.status(200).send(tokens)
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }

    updateUser = async (request: Request, response: Response) => {
        try {
            const { body } = request
            const accessToken = request.headers.authorization.split(" ")[1]
            const decoded = checkToken(accessToken)
            if (decoded.isExpired) {
                return response.status(401).send("Access token was expired")
            }
            const userId = decoded.payload.sub.toString()
            await this.userService.update(userId, body)
            response.status(200).send("Success")
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }

    deleteUser = async (request: Request, response: Response) => {
        try {
            const accessToken = request.headers.authorization.split(" ")[1]
            const decoded = checkToken(accessToken)
            if (decoded.isExpired) {
                return response.status(401).send("Access token was expired")
            }
            const userId = decoded.payload.sub.toString()
            await this.userService.delete(userId)
            response.status(200).send("Success")
        } catch (error) {
            response.status(500).send({ error: error.message })
        }
    }
}

export default UserController