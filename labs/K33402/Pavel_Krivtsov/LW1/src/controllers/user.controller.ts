import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import UserService from '../services/user.service'
import { User } from '../models/user.model'

const userService = new UserService()

class UserController {
    login = async (request: Request, response: Response) => {
        const { username, password } = request.body

        if (!(username && password)) {
            return response
                .status(400)
                .send({ error: 'Empty name or password' })
        }

        try {
            const user = await userService.getByUsername(username)
            if (!user.checkIfPasswordMatch(password)) {
                return response.status(401).send({ error: 'Wrong password' })
            }
            const newTokenVersion = await userService.updateUserTokenVersion(
                user.username
            )
            const token = jwt.sign(
                {
                    userId: user.id,
                    username: user.username,
                    v: newTokenVersion,
                },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.JWT_LIFETIME as string }
            )
            response.send(token)
        } catch (error) {
            return response.status(401).send({ error: 'User does not exist' })
        }
    }

    signup = async (request: Request, response: Response) => {
        const { username, password } = request.body
        try {
            await userService.create(username, password)
            response.status(201).send({ msg: 'User created' })
        } catch (error) {
            return response.status(409).send({ msg: 'Username already in use' })
        }
    }

    getAll = async (request: Request, response: Response) => {
        const allUsers = await userService.getAll()
        return response.send(allUsers)
    }

    addTemplate = async (request: Request, response: Response) => {
        const templateId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.addOrDeleteTemplate(
            username,
            templateId,
            true
        )
        return response.send(user)
    }

    removeTemplate = async (request: Request, response: Response) => {
        const templateId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.addOrDeleteTemplate(
            username,
            templateId,
            false
        )
        return response.send(user)
    }

    me = async (request: Request, response: Response) => {
        const username = response.locals.jwtPayload.username
        const user = await userService.getByUsername(username)
        return response.send(user)
    }
}

export default UserController
