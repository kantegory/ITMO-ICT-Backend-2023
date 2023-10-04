import express from "express"
import userRoutes from "./User"
import entryRoutes from "./EventEntries"
import eventRoutes from "./Event"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/entries', entryRoutes)
router.use('/events', eventRoutes)

export default router
