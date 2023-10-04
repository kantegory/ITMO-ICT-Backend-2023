import express from "express"
import goodRoutes from "./goods/Good"
import sellRoutes from "./sells/Sell"
import sfaffRoutes from './staffs/Staff'

const router: express.Router = express.Router()

router.use('/good', goodRoutes)
router.use('/sell', sellRoutes)
router.use('/staff', sfaffRoutes)

export default router