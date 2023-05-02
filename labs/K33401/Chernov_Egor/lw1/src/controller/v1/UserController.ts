import { Request, Response } from "express"
import UserService from "../../service/v1/UserService"
import PortfolioService from "../../service/v1/PortfolioService"
import RefreshTokenService from "../../service/v1/RefreshTokenService"

class UserController {
    private userService: UserService
    private portfolioService: PortfolioService
    private refreshTokenService: RefreshTokenService

    constructor() {
        this.userService = new UserService()
        this.portfolioService = new PortfolioService()
        this.refreshTokenService = new RefreshTokenService()
    }

    getAll = async (request: Request, response: Response) => {
        const users = await this.userService.getAll()
        return response.send(users)
    }

    getUser = async (request: Request, response: Response) => {
        // todo: get user by access token
        const { authorization } = request.headers
        const user = await this.userService.getUser(authorization)
        return response.send("user")
    }

    postSignupUser = async (request: Request, response: Response) => {
        const { body } = request
        const user = await this.userService.create(body)
        try {
            const tokens = await this.refreshTokenService.create(user)
            await this.portfolioService.create(user)
            return response.send(tokens)
        } catch (e: any) {
            await this.userService.delete(user)
            console.log(e)
            throw "Error of registration"
        }
    }

    postLoginUser = async (request: Request, response: Response) => {
        const { body } = request
        const { email, password } = body
        const user = this.userService.login(email, password)
        const tokens = this.refreshTokenService.get(user)
        return response.send(tokens)
    }

    deleteUser = async (request: Request, response: Response) => {
        const todo = "drop row from DB"

        return response.send(todo)
    }

    get_current_user = async (request: any, response: any) => {
        return response.send(request.user)
    }

    refreshToken = async (request: any, response: any) => {
        const todo = "check user, generate new refresh jwt token"

        return response.send(todo)
    }
}

export default UserController