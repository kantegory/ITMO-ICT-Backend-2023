import UserService from "../../services/users/UserService";
import {Request, response, Response} from "express";

class UserController{
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: Request, response: Response) => {
        try {
            const user = await this.userService.getById(Number(request.params.id))
            console.log(user)
            response.send(user)
        } catch (e:any) {
            response.status(404).send({ "error": e.name })
        }
    }

    getAll = async (request: Request, respone: Response) => {
        try {
            const users = await this.userService.getUsers()
            respone.send(users)
        } catch (e: any) {
            response.status(404).send({"error": e.message})
        }
    }

    post = async (request: Request, response: Response) => {
        try {
            const {email, name} = request.body
            const user = await this.userService.createUser({email, name})
            response.send(user)
        } catch (e:any) {
            response.status(404).send({"error": e.message})
        }
    }
}

export default UserController;