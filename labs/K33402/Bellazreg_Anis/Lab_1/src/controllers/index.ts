import { v4 as uuidv4 } from "uuid"
import UserService from "../services/user"

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const records = await this.userService.listUsers()
            return response.json(records);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    post = async (request: any, response: any) => {
        const id = uuidv4()
        try {
            const record = await this.userService.create({ ...request.body, id})
            return response.json({ record, msg: 'Successfully create user' })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
    getbyID = async (request: any, response: any) => {
        try {
            const record = await this.userService.getById(request.params.id)
            return response.json(record);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    put = async (request: any, response: any) => {
        try {
            const record = await this.userService.updateUser(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update user' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    delete = async (request: any, response: any) => {
        try {
            const record = await this.userService.deleteUser(request.params.id)
            return response.json({msg: 'Successfully delete user' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default UserController
