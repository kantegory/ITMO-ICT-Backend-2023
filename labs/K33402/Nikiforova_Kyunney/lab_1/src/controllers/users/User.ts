import UserService from "../../services/users/User"
import { jwtOptions } from '../../middlewares/passport'
import jwt from 'jsonwebtoken'

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    get = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(
                Number(request.params.id)
            )
            response.send(user)
            
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request
        try {
            const user = await this.userService.create(body)
            response.status(201).send(user)

        } catch (error: any) {
            response.status(400).send({ "error" : error.message })
        }
    }

    me = async (request: any, response: any) => {
        response.send(request.user)
    }

    auth = async (request: any, response: any) => {
        const { body } = request
        const { email, password } = body
        try {
            const { user, checkPassword } = await this.userService.checkPassword(email, password)
            if (checkPassword) {
                const payload = { id: user.id }
                console.log('payload is', payload)
                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)
                response.send({accessToken: accessToken})
            } else {
                throw new Error('Login or password is incorrect!')
            }
        } catch (error: any) {
            response.status(401).send({ "error": error.message })
        }
    }

    deleteUser = async (request: any, response: any) => {
        try {
            const user = await this.userService.deleteById(
                Number(request.params.id)
            )
            response.status(204).send("User deleted")

        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default UserController