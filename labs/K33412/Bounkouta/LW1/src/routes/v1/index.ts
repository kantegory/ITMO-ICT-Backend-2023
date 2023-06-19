import express from "express"
import userRoutes from "./users/index"

const router: express.Router = express.Router()

router.use('/users', userRoutes)

export default router