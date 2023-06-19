import UserService from "../../services/users/User"
import { jwtOptions } from '../../middlewares/passport'
import jwt from 'jsonwebtoken'

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    signup = async (request: any, response: any) => {
        const { body } = request
        try {
            await this.userService.create(body)
            response.status(200).send({ "status" : "OK" })
        } catch (error: any) {
            response.status(400).send({ "error" : error.message })
        }
    }

    login = async (request: any, response: any) => {
        const { body } = request
        const { email, password } = body
        try {
            const { user, checkPassword } = await this.userService.checkPassword(email, password)
            if (checkPassword) {
                const payload = { id: user.id }
                console.log('payload is', payload)
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)
                response.send({accessToken: accessToken})
            }
        } catch (error: any) {
            response.status(401).send({ "error": error.message })
        }
    }

    me = async (request: any, response: any) => {
        response.send(request.user)
    }

    get = async (request: any, response: any) => {
        const userId = request.params.id
        try {
            const user = await this.userService.getByID(userId)
            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}