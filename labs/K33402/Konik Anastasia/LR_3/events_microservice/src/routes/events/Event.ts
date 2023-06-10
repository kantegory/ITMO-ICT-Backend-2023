import express from 'express'
import EventController from '../../controllers/events/Event'
import EnrollController from "../../controllers/enrolls/Enroll";

const eventRoutes = express.Router()

const controller: EventController = new EventController()
const enroll_controller: EnrollController = new EnrollController()

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


eventRoutes.route('/enroll/all')
    .get(enroll_controller.getAll)
eventRoutes.route('/enroll/')
    .post(enroll_controller.post)
eventRoutes.route('/enroll/delete/:id')
    .delete(enroll_controller.delete)
eventRoutes.route('/enroll/user/:userId')
    .get(enroll_controller.getUserEnrolls)


export default eventRoutes
