import express from "express"
import userRoutes from "./users/User"
import companyRoutes from "./photo_companies/Ph_companies"
import dogsRoutes from "./photographers/Ph"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/companies', companyRoutes)
router.use('/photographers', dogsRoutes)

export default router