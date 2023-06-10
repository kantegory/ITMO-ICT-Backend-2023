import express from "express"
import userRouter from "./UserRouter"
import tokenRouter from "./TokenRouter";


const router: express.Router = express.Router()

router.use('/users', userRouter)
router.use('/token', tokenRouter)

export default router