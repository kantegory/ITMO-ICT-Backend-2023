import express from "express"
import eventRoutes from "./event.routes";
import registrationRoutes from "./registration.routes";

const router: express.Router = express.Router()
router.use('/events', eventRoutes)
router.use('/registrations', registrationRoutes)
export default router