import { Request, Response } from "express"
import UserService from "../../service/v1/UserService"

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    getAll = async (request: Request, response: Response) => {
        const users = await this.userService.getAll()
        return response.send(users)
    }

    getUser = async (request: Request, response: Response) => {
        const { body } = request
        const user = await this.userService.getByEmail(body.email)
        return response.send(user)
    }

    postCreateUser = async (request: Request, response: Response) => {
        const todo = "create user in Service, create jwt, create portfolio in Service"
        const { body } = request
        const user = await this.userService.create(body)

        return response.send(user)
    }

    postLoginUser = async (request: Request, response: Response) => {
        const todo = "auth and get user from DB, auth jwt"

        return response.send(todo)
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