import express from "express"
import userRoutes from "./User"
import portfolioRoutes from "./Portfolio"
import coinRoutes from "./Coin"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/portfolio', portfolioRoutes)
router.use('/coins', coinRoutes)

export default router