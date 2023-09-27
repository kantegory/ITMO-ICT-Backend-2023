import { Request, Response, NextFunction } from 'express'

import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

import UserService from '../services/user.service'
import 'dotenv/config'

const userService = new UserService()

export const checkJWT = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const token = <string>request.headers['auth']
    let jwtPayload: JwtPayload | string

    try {
        jwtPayload = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload
        response.locals.jwtPayload = jwtPayload
        const user = await userService.getByUsername(jwtPayload.username)
        if (user.tokenVersion != jwtPayload.v) {
            throw { status: 404, message: 'Not Found' }
        }
    } catch (error) {
        response.status(401).send({ error: 'Invalid token' })
        return
    }
    next()
}
