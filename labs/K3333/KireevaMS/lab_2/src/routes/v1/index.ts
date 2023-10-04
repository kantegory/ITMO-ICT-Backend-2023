import express from "express"
import userRoutes from "./users/User"
import currencyRoutes from "./currency/Currency"
import portfolioRoutes from "./portfolio/Portfolio";
import plotRoutes from "./plot/Plot";

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/currencies', currencyRoutes)
router.use('/portfolio', portfolioRoutes)
router.use('/plot', plotRoutes)


export default router
