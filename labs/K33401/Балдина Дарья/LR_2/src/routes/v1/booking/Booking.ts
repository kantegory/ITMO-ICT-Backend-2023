import express from 'express'
import BookingController from '../../../controllers/booking/Booking'
import passport from "../../../middlewares/passport"

const bookingRoutes = express.Router()
const controller: BookingController = new BookingController()

bookingRoutes.route('/').get(passport.authenticate('jwt', { session: false }), controller.getById)
bookingRoutes.route('/').post(passport.authenticate('jwt', { session: false }), controller.post)
bookingRoutes.route('/update/:id').put(passport.authenticate('jwt', { session: false }), controller.update)
bookingRoutes.route('/delete/:id').delete(passport.authenticate('jwt', { session: false }), controller.delete)


export default bookingRoutes