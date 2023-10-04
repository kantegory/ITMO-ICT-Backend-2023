import express from "express"
import AuthController from "../controllers/auth/auth"
import UserController from '../controllers/user/user'
import EventController from '../controllers/event/event'
import TicketController from '../controllers/ticket/ticket'

const router: express.Router = express.Router()
const passport = require('passport')

const authController = new AuthController()
const userController = new UserController()
const eventController = new EventController()
const ticketController = new TicketController()

router.route('/login').post(authController.login)
router.route('/getUsers').get(userController.get)
router.route('/addUser').post(userController.add)

router.route('/getAllEvents').get(eventController.getAll)
router.route('/getEvents').get(eventController.getFiltered)
router.route('/addEvent').post(eventController.add)

router.route('/getTickets').get(passport.authenticate('jwt', { session: false }), ticketController.get)
router.route('/addTicket').post(passport.authenticate('jwt', { session: false }), ticketController.add)

export default router
