import express from "express"
import userRoutes from "./users/User"
import productRoutes from "./products/Product"
import supplyRoutes from "./products/Supply"
import saleRoutes from "./products/Sale"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/supplies', supplyRoutes)
router.use('/sales', saleRoutes)

export default router