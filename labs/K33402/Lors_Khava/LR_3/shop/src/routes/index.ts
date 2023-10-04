import express from "express"
import productRoutes from "./products/Product"
const router: express.Router = express.Router()

router.use('/products', productRoutes)

export default router