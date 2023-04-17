import { Request, Response, NextFunction } from "express"
import "dotenv/config"
import * as jwt from "jsonwebtoken"
import UserService from "../services/User";
import { User } from "../models/User";

const userService = new UserService()

export const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["auth"]
    let jwtPayload

    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET as string)
        res.locals.jwtPayload = jwtPayload
        const user = await userService.getById(jwtPayload.userId)
        if (user.tokenVersion != jwtPayload.v) {
            throw {
                status: 404,
                message: "Not Found",
            };
        }
    } catch (error) {
        res.status(401).send({
            error: "Invalid token"
        })
        return
    }

    next();
};