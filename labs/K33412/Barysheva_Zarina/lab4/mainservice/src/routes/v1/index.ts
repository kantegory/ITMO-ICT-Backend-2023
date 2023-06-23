import express from "express"
import currencyRoutes from "./currency/Currency"
import briefcaseRoutes from './briefcases/Briefcase'
import historyRoutes from './history/History'
import userRoutes from "./users/User"

const router: express.Router = express.Router()

router.use('/users', userRoutes)

router.use('/currency', currencyRoutes)
router.use('/briefcases', briefcaseRoutes)
router.use('/history', historyRoutes)

export default router
