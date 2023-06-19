import express from "express"
import userRoutes from "./users/User"
import goodsRoutes from "./goods/Goods"
import workersRoutes from "./workers/Workers"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/goods', goodsRoutes)
router.use('/workers', workersRoutes)

export default router