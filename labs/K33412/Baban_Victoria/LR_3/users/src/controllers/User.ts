import User from "../models/User"
import UserService from "../services/User"
import jwt from 'jsonwebtoken'
import UserError from "../errors/User"
import { checkPassword, hashPassword } from "../utils/password"

const jwtSecret: jwt.Secret = "sUbGuVE~t[)ByQDjcV?LCa_c4};LI-_n"

class UserController {
    private userService: UserService = new UserService()

    login = async (request: any, response: any) => {
        const {email, password} = request.body
        try {
            const user: User = await this.userService.get(email, password)
            const token = jwt.sign({
                id: user.id,
                username: user.username,
            }, "sUbGuVE~t[)ByQDjcV?LCa_c4};LI-_n")

            response.send({
                username: user.username,
                email: user.email,
                token
            })
        } catch (err) {
            response.status(400).send((err as UserError).message)
        }
    }

    register = async (request: any, response: any) => {
        const {body} = request
        console.log(body)
        try {
            const user = await this.userService.create(body)
            response.status(201).send(user)
        } catch (err) {
            response.status(400).send((err as UserError).message)
        }
    }
    me = async (request: any, response: any) => {
        if (request.headers.user === undefined) {
            response.status(401).send('Unauthorised!')
        } else {
            try {
                const user = await this.userService.getById(Number(request.headers.user))
                response.send({
                    id: user.id,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    username: user.username,
                    email: user.email
                })
            } catch (err) {
                if (err as UserError)
                    response.status(400).send((err as UserError).message)
                else
                    response.sendStatus(500)
            }
        }
    }
    updatePassword = async (request: any, response: any) => {
        const {oldPassword, newPassword} = request.body

        try {
            const user: User = await this.userService.getById(Number(request.headers.user))
            if (checkPassword(oldPassword, user.password)) {
                user.password = hashPassword(newPassword)
                await this.userService.update(user)
                response.status(200).send(JSON.stringify("Password change successfully"))
            } else {
                response.status(400).send(JSON.stringify("Invalid password"))
            }
        } catch (err) {
            response.status(400).send((err as Error).message)
        }
    }

    auth = async (request: any, response: any, next: any) => {
        const authHeader = request.headers['authorization']
        if (authHeader) {
            try {
                const token = authHeader.split(' ')[1]
                const userPayload: any = jwt.verify(token, jwtSecret)
                const user: User = await this.userService.getById(userPayload.id)
                request.user = user

                response.status(200).send(request.user)
            }
            catch (error: any) {
                if (error as UserError)
                    response.sendStatus(401)
                else
                    response.status(500).send(error.message)
            }
        }
        else {
            response.sendStatus(401)
        }

    }

}

export default UserController
