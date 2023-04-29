import express from "express"
import userRouter from "./UserRouter"
import portfolioRouter from "./PortfolioRouter"
import coinRouter from "./CoinRouter"

const router: express.Router = express.Router()

router.use('/users', userRouter)
router.use('/portfolio', portfolioRouter)
router.use('/coins', coinRouter)

export default router