import express from "express"
import eventRoutes from "./events/Event";

const router: express.Router = express.Router()

router.use('/events', eventRoutes)

export default router
