import UserService from '../services/users/user'
import User from '../models/users/User';
import express from "express"


class UserController {

    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (req: express.Request, res: express.Response) => {

        res.type("json")

        const users = await this.userService.get();
        res.send(users)
    }

    getById = async (request: any, response: any) => {
        try {
            const user: User = await this.userService.getById(
                Number(request.params.id)
            )
            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (req: express.Request, response: express.Response) => {
        response.type("json") 
        const { body } = req
        try {
            const user = await this.userService.create(body)
            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };

    patch = async (req: express.Request, response: express.Response) => {
        response.type("json")
        const { body } = req;
        const { id } = req.params

        try {
            const user = await this.userService.update(Number(id), body)
            response.status(200).send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };

    delete = async (req: express.Request, response: express.Response) => {
        response.type("json");
        const { id } = req.params;

        try {
            await this.userService.delete(Number(id))
            response.status(204).send()
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };
}

export default UserController