import express from "express"
import authRoutes from "./auth/Auth"

const router: express.Router = express.Router()

router.use('/', authRoutes)

export default router