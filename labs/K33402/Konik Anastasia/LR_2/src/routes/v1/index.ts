import express from "express"
import userRoutes from "./users/User"
import eventRoutes from "./events/Event"
import enrollRoutes from "./enrolls/Enroll";

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/events', eventRoutes)
router.use('/enrolls', enrollRoutes)

export default router
