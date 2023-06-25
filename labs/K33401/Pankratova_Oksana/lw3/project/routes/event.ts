import express from "express"
import EventController from "../controllers/event"
import passport from "../middlewares/passport"

const router: express.Router = express.Router()

const controller: EventController = new EventController()

router.route('/')
    .get(passport.authenticate('bearer', { session: false }), controller.getAll)

router.route('/')
    .post(passport.authenticate('bearer', { session: false }), controller.post)

router.route('/id/:id')
    .get(passport.authenticate('bearer', { session: false }), controller.get)

router.route('/type/:type')
    .get(passport.authenticate('bearer', { session: false }), controller.getByType)

router.route('/place/:place')
    .get(passport.authenticate('bearer', { session: false }), controller.getByPlace)

router.route('/organizer/:organizer')
    .get(passport.authenticate('bearer', { session: false }), controller.getByOrganizer)

router.route('/calendar')
    .get(passport.authenticate('bearer', { session: false }), controller.getCalendar)

export default router