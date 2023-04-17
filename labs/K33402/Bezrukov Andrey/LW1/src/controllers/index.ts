import UserService from "../services"

class UserController {
    private userService: UserService
    constructor() {
        this.userService = new UserService()
    }
    get = async (request: any, response: any) => {
        try {
            const users = await this.userService.getAll()
            return response.json(users);
        } catch (e: any) {
            response.status(404).send({ "error": e.message })
        }
    }
    getbyID = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(request.params.id)
            return response.json(user);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    getbyEmail = async (request: any, response: any) => {
        try {
            const user = await this.userService.getByEmail(request.params.email)
            return response.json(user);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    post = async (request: any, response: any) => {
        try {
            const { body } = request
            const user = await this.userService.create(body);
            return response.json({user, msg: "created" })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
    put = async (request: any, response: any) => {
        try {
            const { body } = request;
            const user = await this.userService.update(request.params.id, body)
            return response.json({user, msg: 'user was updated' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    delete = async (request: any, response: any) => {
        try {
            const user = await this.userService.delete(request.params.id)
            return response.json({msg: 'user was deleted' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default UserController