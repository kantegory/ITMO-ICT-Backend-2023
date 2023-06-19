import express from "express"
import userRouter from "./UserRouter"

const router: express.Router = express.Router()

router.use('/users', userRouter)

export default router