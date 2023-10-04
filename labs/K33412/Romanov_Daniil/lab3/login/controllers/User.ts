import UserService from "../services/User";
import hashPassword from "../utils/hashPassword";
import jwt from 'jsonwebtoken'
import { jwtOptions } from "../middlewares/passport";

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(
                Number(request.params.id)
            )
            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error" : error.message })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request
        try {
            body.password = hashPassword(body.password)
            const user = await this.userService.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    me = async (request: any, response: any) => {
        console.log('user', request.user)
        response.send(request.user)
    }

    auth = async (request: any, response: any) => {
        const { body } = request
        const { email, password } = body
        try {
            const { user, checkPassword } = await this.userService.checkPassword(email, password)
            console.log(user)
            if (checkPassword) {
                const payload = { id: user.id }
                console.log('payload is', payload)
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)
                response.send({ accessToken: accessToken })
            } else {
                throw new Error('Login or password is incorrect!')
            }
        } catch (error: any) {
            response.status(401).send({ "error": error.message })
        }
    }

    accessToken = async (request: any, response: any) => {
        const { body } = request
        const { accessToken } = body
        try {
            const payload = jwt.verify(accessToken, jwtOptions.secretOrKey)
            // @ts-ignore
            const user = await this.userService.getById(payload.id)
            response.send({'valid': true, 'user': user})
        } catch (error: any) {
            response.status(401).send({ "error": error.message })
        }
    }
}

export default UserController