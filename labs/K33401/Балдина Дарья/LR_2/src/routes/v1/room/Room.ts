import express from 'express'
import RoomController from '../../../controllers/room/Room'
import passport from "../../../middlewares/passport"

const roomRoutes = express.Router()
const controller: RoomController = new RoomController()

roomRoutes.route('/').get(passport.authenticate('jwt', { session: false }), controller.list)
roomRoutes.route('/').post(passport.authenticate('jwt', { session: false }), controller.post)
roomRoutes.route('/number/:roomNumber').get(passport.authenticate('jwt', { session: false }), controller.getByRoomNumber)
roomRoutes.route('/update/:id').put(passport.authenticate('jwt', { session: false }), controller.update)
roomRoutes.route('/delete/:id').delete(passport.authenticate('jwt', { session: false }), controller.delete)


export default roomRoutes