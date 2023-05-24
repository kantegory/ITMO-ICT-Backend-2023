import axios, {isAxiosError} from "axios"
import express, {Request, Response} from "express"
import {COINS_SERVICE_URL} from "../index";
import {authMiddleware} from "../middlewares/authMiddleware";


const coinRouter: express.Router = express.Router()

coinRouter.route('/*')
    .all(authMiddleware, async (req: Request, res: Response) => {
        try {
            const response = await axios({
                method: req.method,
                url: COINS_SERVICE_URL + req.url,
                headers: {"user-id": req.user?.id},
                data: req.body ? {...req.body, user: req.user} : undefined
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

export default coinRouter