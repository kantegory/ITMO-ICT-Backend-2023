import { Request, Response } from "express"

class UserController {
    get_all = async (request: Request, response: Response) => {
        const todo = "get list of users from DB"

        return response.send(todo)
    }

    get = async (request: Request, response: Response) => {
        const todo = "get user from DB"

        return response.send(todo)
    }

    post_create_user = async (request: Request, response: Response) => {
        const todo = "create user in DB, create jwt, create portfolio in DB"

        return response.send(todo)
    }

    post_login_user = async (request: Request, response: Response) => {
        const todo = "auth and get user from DB, auth jwt"

        return response.send(todo)
    }

    delete = async (request: Request, response: Response) => {
        const todo = "delete row from DB"

        return response.send(todo)
    }
}

export default UserController