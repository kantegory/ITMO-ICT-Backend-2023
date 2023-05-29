import express from "express"
import goodsRoutes from "./goods/Goods"
const router: express.Router = express.Router()

router.use('/goods', goodsRoutes)

export default router