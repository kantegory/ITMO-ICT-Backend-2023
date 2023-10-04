import express from "express"
import { EventController } from "../../controllers/events/Event"

const routes: express.Router = express.Router()

const controller: EventController = new EventController()

routes.route('/create')
    .post(controller.create)

routes.route('/:id')
    .get(controller.get)

routes.route('/:id')
    .put(controller.update)

routes.route('/:id')
    .delete(controller.delete)

routes.route('/filter')
    .post(controller.filter)

routes.route('/')
    .get(controller.calendar)

routes.route('/author/:id')
    .get(controller.author)

export default routes