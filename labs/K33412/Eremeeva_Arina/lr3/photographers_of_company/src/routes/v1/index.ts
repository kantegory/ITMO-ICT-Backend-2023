import express from "express"
import companyRoutes from "./photo_companies/Ph_companies"
import dogsRoutes from "./photographers/Ph"

const router: express.Router = express.Router()

router.use('/companies', companyRoutes)
router.use('/photographers', dogsRoutes)

export default router