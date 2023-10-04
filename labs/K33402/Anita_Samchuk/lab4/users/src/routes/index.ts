import {Request, Response, Router} from "express";
import {userRouter} from "./users/userRoutes"

const router = Router()

router.use('/users', userRouter)
router.get("/", async (request: Request, response: Response) => {
    response.send('Healthcheck: OK')
})

export default router
