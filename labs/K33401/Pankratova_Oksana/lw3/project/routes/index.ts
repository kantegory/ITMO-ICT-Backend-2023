import express from "express"
import eventRoutes from "./event"
import placeRoutes from "./place"
import organizersRoutes from "./organizer"
import registrationRoutes from "./registration"

const router: express.Router = express.Router()

router.use('/events', eventRoutes)
router.use('/places', placeRoutes)
router.use('/organizers', organizersRoutes)
router.use('/registration', registrationRoutes)


export default router