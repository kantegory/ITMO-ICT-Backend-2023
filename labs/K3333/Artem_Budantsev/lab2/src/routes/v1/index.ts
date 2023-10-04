import express from "express"
import authRoutes from "./auth/Auth"
import goodRoutes from "./goods/Good"
import sellRoutes from "./sells/Sell"
import sfaffRoutes from './staffs/Staff'

const router: express.Router = express.Router()

router.use('/auth', authRoutes)
router.use('/good', goodRoutes)
router.use('/sell', sellRoutes)
router.use('/staff', sfaffRoutes)

export default router