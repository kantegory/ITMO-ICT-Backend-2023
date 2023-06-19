import User from "../models/User"
import UserService from "../services/User"
import jwt from 'jsonwebtoken'
import UserError from "../errors/User"
import { checkPassword, hashPassword } from "../utils/password"


class UserController {
    private userService: UserService = new UserService()

    login = async (request: any, response: any) => {
        const { email, password } = request.body
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
        }
        catch (err) {
            response.status(400).send((err as UserError).message)
        }
    }
    register = async (request: any, response: any) => {
        const { body } = request
        try {
            const user = await this.userService.create(body)
            response.status(201).send(user)
        }
        catch (err) {
            response.status(400).send((err as UserError).message)
        }
    }
    me = async (request: any, response: any) => {
        if (request.user === undefined) {
            response.sendStatus(401)
        }
        else {
            try {
                const user = await this.userService.getById(request.user.id)
                response.send({
                    id: user.id,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    username: user.username,
                    email: user.email
                })
            }
            catch (err) {
                if (err as UserError)
                    response.status(400).send((err as UserError).message)
                else
                    response.sendStatus(500)
            }
        }
    }
    updatePassword = async (request: any, response: any) => {
        const { oldPassword, newPassword } = request.body
        try {
            console.log(request.body)
            const user: User = await this.userService.getById(request.user.id)
            if (checkPassword(oldPassword, user.password)) {
                user.password = hashPassword(newPassword)
                await this.userService.update(user)
                response.status(200).send("Password change successfully")
            }
            else {
                response.sendStatus(400)
            }
        }
        catch (err) {
            response.status(400).send((err as Error).message)
        }
    }
}

export default UserController

