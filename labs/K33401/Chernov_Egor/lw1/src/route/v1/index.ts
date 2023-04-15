import express from "express"
import userRouter from "./UserRoute"
import portfolioRouter from "./PortfolioRoute"
import coinRouter from "./CoinRoute"

const router: express.Router = express.Router()

router.use('/users', userRouter)
router.use('/portfolio', portfolioRouter)
router.use('/coins', coinRouter)

export default router