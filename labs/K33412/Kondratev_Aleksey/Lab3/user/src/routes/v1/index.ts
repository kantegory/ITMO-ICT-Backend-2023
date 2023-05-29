import express from "express"
import userRoutes from "./users/User"

const router: express.Router = express.Router()

router.use('/users', userRoutes)

export default router