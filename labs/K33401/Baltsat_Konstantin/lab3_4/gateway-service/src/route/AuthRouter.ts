import express, {Request, Response} from "express"
import axios, {isAxiosError} from "axios";
import {AUTH_SERVICE_URL} from "../index";


const authRouter: express.Router = express.Router()

authRouter.route('/*')
    .all(async (req: Request, res: Response) => {
        try {
            const authorization = req.headers.authorization
            const response = await axios({
                method: req.method,
                url: AUTH_SERVICE_URL + req.url,
                headers: authorization ? {"Authorization": authorization} : undefined,
                data: req.body ? req.body : undefined
            })
            return res.json(response.data)
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return res.status(e.response.status).json(e.response.data)
            } else {
                console.log(e)
                return res.status(500).json({"error": "Gateway server internal error"})
            }
        }
    })

export default authRouter;