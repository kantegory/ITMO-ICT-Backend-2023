import express from "express"
import productRoute from "./product"
import employeeRoute from "./employee"
import orderRoute from "./order"
import orderItemRoute from "./orderItem"
import salesRoute from "./sales"


const router: express.Router = express.Router()


router.use('/productRoute', productRoute)
router.use('/employeeRoute', employeeRoute)
router.use('/orderRoute', orderRoute)
router.use('/orderItemRoute', orderItemRoute)
router.use('/orderItemRoute', orderItemRoute)
router.use('/saleRoute', salesRoute)


export default router