import express from "express"
import EventController from "../controllers/event.controller"

const eventRoutes: express.Router = express.Router()
const controller: EventController = new EventController()

eventRoutes.route('/').get(controller.getAll)
eventRoutes.route('/').post(controller.create)
eventRoutes.route('/:id').delete(controller.delete)
eventRoutes.route('/:id').get(controller.get)
eventRoutes.route('/:id').put(controller.update)

export default eventRoutes