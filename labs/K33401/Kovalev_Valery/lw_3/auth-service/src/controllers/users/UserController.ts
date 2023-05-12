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

    register = async (request: Request, response: Response) => {
        try {
            const {email, name, password} = request.body
            console.log(email, name, password)
            const user = await this.userService.createUser({email, name, password})
            return response.json({id:user.id, email: user.email, name: user.name})
        } catch (e:any) {
            return response.status(404).json({"error": e.message})
        }
    }

    createJWT = async (request: Request, response: Response) => {
        try {
            const {email, password} = request.body
            const jwt = await this.userService.jwtCreate(email, password)
            return response.json({access: jwt.id})
        } catch (e: any) {
            return response.status(404).json({"error": e.message})
        }
    }

    me = async (request: Request, response: Response) => {
        try {
            const token = request.headers.authorization
            if(token){
                const user = await this.userService.me(token)
                return response.json({id:user.id, email: user.email, name: user.name})
            }
            return response.status(404).json({"error": "token is undefined"})
        } catch (e:any) {
            return response.status(404).json({"error": e.message})
        }
    }
}

export default UserController;
