import axios, {isAxiosError} from "axios"
import express, {Request, Response} from "express"
import {COINS_SERVICE_URL} from "../index";


const coinRouter: express.Router = express.Router()

coinRouter.route('/*')
    .all(async (req: Request, res: Response) => {
        try {
            const authorization = req.headers.authorization
            const response = await axios({
                method: req.method,
                url: COINS_SERVICE_URL + req.url,
                headers: authorization ? {"Authorization": authorization} : undefined,
                data: req.body ? {...req.body} : undefined
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