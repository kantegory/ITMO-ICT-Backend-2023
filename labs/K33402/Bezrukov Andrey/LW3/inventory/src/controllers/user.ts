import User from "../models/user"
import UserService from "../services/user"
import authMiddleware from "../middleware/authenticate"
import * as _ from "lodash"


class UserController {
    private userService: UserService = new UserService()

    signup = async (request: any, response: any) => {
        const { body } = request
        try {
            await this.userService.create(body)
            response.status(200).send({ "status" : "OK" })
        }
        catch (error: any) {
            response.status(400).send({ "error" : error.message })
        }
    }

    login = async (request: any, response: any) => {
        const { body } = request
        const username = body.username || body.email
        try {
            const user: User = await this.userService.get(username, body.password)
            const token: string = await authMiddleware.createToken(user)

            response.status(200).send({ token: token })
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
               
    }

    profile = async (request: any, response: any) => {
        if (request.user === undefined) {
            response.sendStatus(401)
        }
        else {
            try {
                const user = await this.userService.getById(request.user.id)
                console.log(user)
                response.status(200).send(_.omit(user, ['password']))
            }
            catch (error: any) {
                response.status(400).send(error.message)
            }
        }
    }

    getAll = async (request: any, response: any) => {
        response.send(await this.userService.getAll())
    }

    put = async (request: any, response: any) => {
        try {
            const { body } = request;
            const user = await this.userService.update(request.params.id, body)
            return response.json({ user, msg: 'Successfully update user' }).status(200)
            
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
    delete = async (request: any, response: any) => {
        try {
            const user = await this.userService.delete(request.params.id)
            return response.json({ msg: 'Successfully delete user' }).status(200)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

}

export default UserController