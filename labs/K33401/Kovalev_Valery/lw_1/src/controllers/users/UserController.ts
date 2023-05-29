import UserService from "../../services/users/UserService";
import {Request, Response} from "express";

class UserController{
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: Request, response: Response) => {
        try {
            const user = await this.userService.getById(Number(request.params.id))
            return response.json(user)
        } catch (e:any) {
         return response.status(404).json({ "error": e.name })
        }
    }

    getAll = async (request: Request, response: Response) => {
        try {
            const {email} = request.query
            if(email){
                const {email} = request.query
                const user = await this.userService.getByEmail(String(email))
                return response.json([user])
            }
            const users = await this.userService.getUsers()
            return response.json(users)
        } catch (e: any) {
            return response.status(404).json({"error": e.message})
        }
    }

    post = async (request: Request, response: Response) => {
        try {
            const {email, name} = request.body
            const user = await this.userService.createUser({email, name})
            return response.json(user)
        } catch (e:any) {
            return response.status(404).json({"error": e.message})
        }
    }
}

export default UserController;
