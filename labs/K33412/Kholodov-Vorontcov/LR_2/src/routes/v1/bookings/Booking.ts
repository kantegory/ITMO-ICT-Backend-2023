import express from 'express'
import BookingController from '../../../controllers/bookings/Booking'
import passport from "../../../middlewares/passport";

const bookingRoutes = express.Router()

const bookingController = new BookingController()

bookingRoutes.route('/').post(passport.authenticate('jwt', { session: false }), bookingController.create)

export default bookingRoutes
