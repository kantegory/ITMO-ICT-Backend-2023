import express from "express"
import eventRoutes from "./Event"
import entryRoutes from "./EventEntries";

const router: express.Router = express.Router()

router.use('/events', eventRoutes)
router.use('/entries', entryRoutes)

export default router
