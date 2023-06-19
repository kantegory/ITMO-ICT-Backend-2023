import express from "express"
import userRoutes from "./users/User"
import workerRoutes from "./workers/Worker"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/workers', workerRoutes)

export default router