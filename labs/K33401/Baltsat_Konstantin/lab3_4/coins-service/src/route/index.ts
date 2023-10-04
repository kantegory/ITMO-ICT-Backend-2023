import express from "express"
import portfolioRouter from "./PortfolioRouter"
import coinRouter from "./CoinRouter"


const router: express.Router = express.Router()

router.use('/portfolios', portfolioRouter)
router.use('/coins', coinRouter)

export default router