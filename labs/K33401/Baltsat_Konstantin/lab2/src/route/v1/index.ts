import express from "express"
import userRouter from "./UserRouter"
import portfolioRouter from "./PortfolioRouter"
import coinRouter from "./CoinRouter"
import tokenRouter from "./TokenRouter";

const router: express.Router = express.Router()

router.use('/users', userRouter)
router.use('/portfolios', portfolioRouter)
router.use('/coins', coinRouter)
router.use('/token', tokenRouter)

export default router