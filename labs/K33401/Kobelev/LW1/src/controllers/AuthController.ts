import { Request, Response } from 'express'
import 'dotenv/config'
import * as jwt from 'jsonwebtoken'

import { User } from '../models/User'
import { AppDataSource } from '../database/data-source'

const userRepository = AppDataSource.getRepository(User)

class AuthController {
    login = async (request: Request, response: Response) => {
        const { username, password } = request.body

        if (!(username && password)) {
            return response.status(400).send({
                error: 'Empty name or password',
            })
        }

        let user: User
        try {
            user = await userRepository.findOneOrFail({
                where: { username: username },
            })
        } catch (error) {
            return response.status(401).send({
                error: 'Cant find user from DB',
            })
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return response.status(401).send({
                error: 'Wrong password',
            })
        }

        user.tokenVersion += 1

        await userRepository.save(user)

        const token = jwt.sign(
            { userId: user.id, username: user.username, v: user.tokenVersion },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_LIFETIME as string }
        )

        response.send(token)
    }

    signup = async (request: Request, response: Response) => {
        const { username, password } = request.body
        const user = new User()
        user.username = username
        user.password = password
        user.tokenVersion = 1

        user.hashPassword()

        try {
            await userRepository.save(user)
        } catch (error) {
            response.status(409).send('Username already in use')
            return
        }

        response.status(201).send('User created')
    }

    me = async (request: Request, response: Response) => {
        response.send(response.locals.jwtPayload.username)
    }
}

export default AuthController
