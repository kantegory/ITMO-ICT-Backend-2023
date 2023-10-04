import express from "express"
import currencyRoutes from "./currency/Currency"
import portfolioRoutes from "./portfolio/Portfolio";
import plotRoutes from "./plot/Plot";

const router: express.Router = express.Router()

router.use('/exchange/currencies', currencyRoutes)
router.use('/exchange/portfolio', portfolioRoutes)
router.use('/exchange/plot', plotRoutes)


export default router
