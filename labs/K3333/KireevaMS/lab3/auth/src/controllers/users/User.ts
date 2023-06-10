import User from '../../models/users/User'
import UserService from '../../services/users/User'
import UserError from '../../errors/users/User'
import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middlewares/passport'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const user: User | UserError = await this.userService.getById(
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
            const user : User|UserError = await this.userService.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
    me = async (request: any, response: any) => {
        response.send(request.user)
    }

    login = async (request: any, response: any) => {
        const { body } = request

        const { email, password } = body
        console.log(email)

        try {

            const { user, checkPassword } = await this.userService.checkPassword(email, password)

            if (checkPassword) {
                const payload = { id: user.id }

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                response.send({ accessToken })
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e: any) {
            response.status(401).send({ "error": e.message })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const users = await this.userService.getAll()

            response.send(users)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    deleteById = async (request: any, response: any)=> {
        try {
            const { id } = request.params;

            const deletedCount = await User.destroy({
                where: {id: id}
            });

            if (deletedCount === 0) {
                throw new UserError(`User with id ${id} not found`);
            }
            else {
                response.send(`User with id ${id} was deleted`)
            }

            response.status(204).send();
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    validateToken = async (request: any, response: any) => {
        const {body} = request
        const {accessToken} = body
        try {
            const payload = jwt.verify(accessToken, jwtOptions.secretOrKey)
            // @ts-ignore
            const user = await this.userService.getById(payload.id)
            response.send({'valid': true, 'user': user})
        } catch (e: any) {
            response.status(401).send({'valid': false})
        }
    }

}

export default UserController
