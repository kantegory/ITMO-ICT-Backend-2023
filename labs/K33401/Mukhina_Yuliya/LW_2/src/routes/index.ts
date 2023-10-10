import express from "express"
import userRoutes from "./user.routes"
import eventRoutes from "./event.routes";

const router: express.Router = express.Router()
router.use('/users', userRoutes)
router.use('/events', eventRoutes)

export default router