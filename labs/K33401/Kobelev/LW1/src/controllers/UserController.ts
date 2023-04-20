import { Request, Response } from 'express'
import UserService from '../services/User'

const userService = new UserService()

class UserController {
    getAllUsers = async (request: Request, response: Response) => {
        const allUsers = userService.getAll()
        return response.send(allUsers)
    }

    addUserRandomEntity = async (request: Request, response: Response) => {
        const randomEntityId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.addRandomEntity(username, randomEntityId)
        return response.send(user)
    }

    removeUserRandomEntity = async (request: Request, response: Response) => {
        const randomEntityId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.deleteRandomEntity(
            username,
            randomEntityId
        )
        return response.send(user)
    }

    getMyRandomEntities = async (request: Request, response: Response) => {
        const username = response.locals.jwtPayload.username
        const user = await userService.getByUsername(username)
        return response.send(user)
    }
}

export default UserController
