import express from "express"
import userRoutes from "./users/User"
import productRoutes from "./products/Product"
import workerRoutes from "./workers/Worker"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/workers', workerRoutes)

export default router