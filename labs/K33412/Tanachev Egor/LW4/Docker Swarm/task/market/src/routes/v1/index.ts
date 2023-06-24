import express from "express"
import productRoutes from "./products/Product"
import supplyRoutes from "./products/Supply"
import realizationRoutes from "./products/Realization"

const router: express.Router = express.Router()

router.use('/products', productRoutes)
router.use('/supplies', supplyRoutes)
router.use('/realizations', realizationRoutes)

export default router


