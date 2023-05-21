import UserService from "../../services/users/UserService";
import {Request, Response} from "express";
import crypto from 'crypto';

class UserController{
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    register = async (request: Request, response: Response) => {
        try {
            const {email, name, password} = request.body
            const user = await this.userService.createUser({email, name, password: crypto.createHash("sha256", password).digest('base64')})
            return response.json({id:user.id, email: user.email, name: user.name})
        } catch (e:any) {
            return response.status(404).json({"error": e.message})
        }
    }

    testFunc = async (request: Request, response: Response) => {
        return response.json({cool:"COOLLLL"})
    }


    get = async (request: Request, response: Response) => {
        try {
            const user = await this.userService.getById(Number(request.params.id))
            return response.json({id:user.id, email: user.email, name: user.name})
        } catch (e:any) {
         return response.status(404).json({ "error": e.name })
        }
    }

    deleteUser = async (request: Request, response: Response) => {
        try {
            const user = await this.userService.deleteUser(Number(request.params.id))
            return response.json({id:user.id, email: user.email, name: user.name})
        } catch (e:any) {
            return response.status(404).json({ "error": e.name })
        }
    }

    changeName = async (request: Request, response: Response) => {
        try {
            if(request.body.name){
                const user = await this.userService.changeName(Number(request.params.id), String(request.body.name))
                return response.json({id:user.id, email: user.email, name: user.name})
            }
            return response.status(403).json({"error": "name field is required"})
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
            const result:any = []
            users.forEach(user=>{
                result.push({id:user.id, email: user.email, name: user.name})
            })
            return response.json(result)
        } catch (e: any) {
            return response.status(404).json({"error": e.message})
        }
    }


    createJWT = async (request: Request, response: Response) => {
        try {
            const {email, password} = request.body
            const {access, refresh} = await this.userService.jwtCreate(email,  crypto.createHash("sha256", password).digest("base64"))
            return response.json({access: access.id, refresh: refresh.id})
        } catch (e: any) {
            return response.status(404).json({"error": e.message})
        }
    }

    refresh = async (request: Request, response: Response) => {
        try {
            const {refresh: bodyRefresh} = request.body
            const {access, refresh} = await this.userService.jwtRefresh(bodyRefresh)
            return response.json({access: access.id, refresh: refresh.id})
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
