import express from "express"
import userRoute from "./userEndpoints"
import productRoute from "./product"
import employeeRoute from "./employee"
import orderRoute from "./order"
import orderItemRoute from "./orderItem"
import salesRoute from "./sales"
import verifyToken from "../middleware/tokenVerification"


const router: express.Router = express.Router()

router.use('/users', userRoute)
router.use('/productRoute',verifyToken, productRoute)
router.use('/employeeRoute',verifyToken, employeeRoute)
router.use('/orderRoute',verifyToken, orderRoute)
router.use('/orderItemRoute',verifyToken, orderItemRoute)
router.use('/orderItemRoute',verifyToken, orderItemRoute)
router.use('/saleRoute',verifyToken, salesRoute)

// router.use('/workers', workersRoutes)

export default router