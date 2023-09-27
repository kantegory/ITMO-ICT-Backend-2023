import {Router} from "express";
import {userRouter} from "./users/userRoutes"

export const router = Router()

router.use('/', userRouter)

