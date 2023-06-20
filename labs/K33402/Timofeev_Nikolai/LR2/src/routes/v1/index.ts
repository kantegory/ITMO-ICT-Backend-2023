import express from "express"
import userRoutes from "./users/User"
import employeeRoutes from './employees/Employee'
import warehouseRoutes from './warehouses/Warehouse'
import unitRoutes from './units/Unit'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/employees', employeeRoutes)
router.use('/warehouses', warehouseRoutes)
router.use('/units', unitRoutes)

export default router
