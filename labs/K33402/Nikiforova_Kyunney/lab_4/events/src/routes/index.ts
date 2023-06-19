import express from "express"
import eventRoutes from "./Event"
import eventSettingsRoutes from "./EventSettings"

const routes: express.Router = express.Router()

routes.use('/info', eventRoutes)
routes.use('/settings', eventSettingsRoutes)

export default routes
