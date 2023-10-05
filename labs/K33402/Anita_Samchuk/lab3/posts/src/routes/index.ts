import {Request, Response, Router} from "express";
import {postRouter} from "./posts/postRouter";
import {commentRouter} from "./comments/commentRouter";

const router = Router()

router.use('/posts', postRouter)
router.get('/healthcheck', async (request: Request, response: Response) => {
    response.send('Healthcheck: OK')
})
export default router
