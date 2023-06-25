import express from "express"
import EventController from "../controllers/event"

const router: express.Router = express.Router()

const controller: EventController = new EventController()

router.route('/')
    .get(controller.getAll)

router.route('/')
    .post(controller.post)

router.route('/id/:id')
    .get(controller.get)

router.route('/type/:type')
    .get(controller.getByType)

router.route('/place/:place')
    .get(controller.getByPlace)

router.route('/organizer/:organizer')
    .get(controller.getByOrganizer)

router.route('/calendar')
    .get(controller.getCalendar)

export default router