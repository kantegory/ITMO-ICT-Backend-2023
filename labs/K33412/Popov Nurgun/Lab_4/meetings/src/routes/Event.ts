import express from "express"
import { EventController } from "../controllers/Event"

const routes: express.Router = express.Router()
const controller: EventController = new EventController()

routes.route('/filter')
    .get(controller.filter)

routes.route('/')
    .get(controller.calendar)

routes.route('/author/:id')
    .get(controller.author)

routes.route('/:id')
    .get(controller.get)

export default routes