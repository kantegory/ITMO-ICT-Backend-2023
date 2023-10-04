import express from "express"
import userRoutes from "./users/User"
import createrRoutes from "./creaters/Creater"
import eventRoutes from "./events/Event"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/creater', createrRoutes)
router.use('/event', eventRoutes)

export default router