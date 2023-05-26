import express from "express"
import authRouter from "./AuthRouter"
import coinRouter from "./CoinRouter"


const router: express.Router = express.Router()

router.use('/auth', authRouter)
router.use('/coins', coinRouter)

export default router