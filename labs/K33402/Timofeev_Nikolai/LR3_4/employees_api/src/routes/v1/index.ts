import express from "express"
import empRoutes from './employees/Employee'

const router: express.Router = express.Router()

router.use('/employees', empRoutes)

export default router
