import express from "express"
import createrRoutes from "./creaters/Creater"
import eventRoutes from "./events/Event"

const router: express.Router = express.Router()

router.use('/creater', createrRoutes)
router.use('/event', eventRoutes)

export default router