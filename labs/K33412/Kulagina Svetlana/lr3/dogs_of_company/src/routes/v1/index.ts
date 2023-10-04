import express from "express"
import companyRoutes from "./dogs_companies/Dogs_companies"
import dogsRoutes from "./dogs/Dogs"

const router: express.Router = express.Router()

router.use('/companies', companyRoutes)
router.use('/dogs', dogsRoutes)

export default router