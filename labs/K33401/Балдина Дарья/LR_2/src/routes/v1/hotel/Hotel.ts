import express from 'express'
import HotelController from '../../../controllers/hotel/Hotel'
import passport from "../../../middlewares/passport"

const hotelRoutes = express.Router()
const controller: HotelController = new HotelController()

hotelRoutes.route('/').get(passport.authenticate('jwt', { session: false }), controller.list)
hotelRoutes.route('/').post(passport.authenticate('jwt', { session: false }), controller.post)
hotelRoutes.route('/name/:name').get(passport.authenticate('jwt', { session: false }), controller.getByName)
hotelRoutes.route('/update/:id').put(passport.authenticate('jwt', { session: false }), controller.update)
hotelRoutes.route('/delete/:id').delete(passport.authenticate('jwt', { session: false }), controller.delete)


export default hotelRoutes