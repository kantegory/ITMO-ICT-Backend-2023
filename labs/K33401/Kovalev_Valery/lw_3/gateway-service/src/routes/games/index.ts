import axios, {isAxiosError} from "axios"
import express, {Request, response, Response} from "express"
import {AUTH_SERVICE_URL} from "../../index";

const router: express.Router = express.Router()


router.route('/*')
    .all(async (req: Request, res: Response) => {
        try {
            const authorization = req.headers.authorization
            try {
                const user = await axios.get(AUTH_SERVICE_URL + "/me", {headers: {Authorization: authorization}})
                const response = await axios({method: req.method, url: AUTH_SERVICE_URL + req.url, headers: authorization ? {"Authorization": authorization}: undefined, data: req.body ? {...req.body, user: user} : undefined} )
                return res.json(response.data)
            } catch (e) {
                return res.status(403).json({"error": "Access Denied"})
            }
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return res.status(e.response.status).json(e.response.data)
            } else {
                console.log(e)
                return res.status(500).json({"error": "Gateway server internal error"})
            }
        }
    })

export default router;