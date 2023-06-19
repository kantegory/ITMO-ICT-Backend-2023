import express from "express"
import currencyRoutes from "./currency/Currency"
import portfolioRoutes from "./portfolio/Portfolio"
import chartRoutes from "./chart/Chart"

const router: express.Router = express.Router();

router.use('/currency', currencyRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/charts', chartRoutes);


export default router;
