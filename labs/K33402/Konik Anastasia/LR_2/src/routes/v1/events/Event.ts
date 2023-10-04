import express from 'express'
import EventController from '../../../controllers/events/Event'

const eventRoutes = express.Router()
const controller: EventController = new EventController()

eventRoutes.route('/all')
    .get(controller.getAll)
eventRoutes.route('/')
    .post(controller.post)
eventRoutes.route('/:id')
    .get(controller.get)
eventRoutes.route('/dfilter/:district')
    .get(controller.d_filter)
eventRoutes.route('/tfilter/:ev_type')
    .get(controller.t_filter)


export default eventRoutes
