import {Router} from "express";
import {userRouter} from "./users/userRoutes"
import {postRouter} from "./posts/postRouter";
import {commentRouter} from "./comments/commentRouter";

const router = Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)

export default router
