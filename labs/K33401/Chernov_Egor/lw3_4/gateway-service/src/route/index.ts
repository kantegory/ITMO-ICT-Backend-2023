import express from "express"
import coinRouter from "./CoinRouter";
import authRouter from "./AuthRouter"


const router: express.Router = express.Router()

router.use('/coins', coinRouter)
router.use('/auth', authRouter)

export default router