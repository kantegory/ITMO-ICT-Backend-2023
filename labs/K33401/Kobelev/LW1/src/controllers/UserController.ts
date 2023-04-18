import { Request, Response } from "express"
import UserService from "../services/User"

const userService = new UserService

class UserController {
    getAllUsers = async (request: Request, response: Response) => {
        const allUsers = userService.getAll()
        return response.send(allUsers)
    }

    addUserRandomEntity = async (request: Request, response: Response) => {
        let randomEntityId =  Number(request.params.id)
        let username = response.locals.jwtPayload.username
        let user = await userService.addRandomEntity(username, randomEntityId)
        return response.send(user)
    }

    removeUserRandomEntity = async (request: Request, response: Response) => {
        let randomEntityId =  Number(request.params.id)
        let username = response.locals.jwtPayload.username
        let user = await userService.deleteRandomEntity(username, randomEntityId)
        return response.send(user)
    }

    getMyRandomEntities = async (request: Request, response: Response) => {
        let username = response.locals.jwtPayload.username
        let user = await userService.getByUsername(username)
        return response.send(user)
    }
}

export default UserController