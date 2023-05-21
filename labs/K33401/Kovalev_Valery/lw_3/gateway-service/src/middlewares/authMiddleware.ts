import {NextFunction, Request, Response} from "express";
import axios, {isAxiosError} from "axios";
import {AUTH_SERVICE_URL, GAMES_SERVICE_URL} from "../index";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization
        try {
            const response1 = await axios.get(AUTH_SERVICE_URL + "/users/me", {headers: {Authorization: authorization}})
            const user = response1.data
            req.user = user
            next()
        } catch (e) {
            return res.status(403).json({"error": "Access Denied"})
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({"error": "Gateway server internal error"})
    }
}