import express from "express"
import eventRoutes from "./Event"
import usereventRoutes from "./UserEvent"

const routes: express.Router = express.Router()

routes.use('/events', eventRoutes)
routes.use('/profile', usereventRoutes)

export default routes
