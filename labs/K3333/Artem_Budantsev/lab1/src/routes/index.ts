import express from "express"
import userRoutes from "./user/user"

const router: express.Router = express.Router()

router.use('/users', userRoutes)

export default router