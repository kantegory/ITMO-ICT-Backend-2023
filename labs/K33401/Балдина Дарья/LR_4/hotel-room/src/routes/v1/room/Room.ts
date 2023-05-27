import express from 'express'
import RoomController from '../../../controllers/room/Room'
import passport from "../../../middlewares/passport"

const roomRoutes = express.Router()
const controller: RoomController = new RoomController()

roomRoutes.route('/rooms/hotel/:id').get(passport.authenticate('bearer', { session: false }), controller.list)
roomRoutes.route('/').post(passport.authenticate('bearer', { session: false }), controller.post)
roomRoutes.route('/number/:roomNumber').get(controller.getByRoomNumber)
roomRoutes.route('/update/:id').put(passport.authenticate('bearer', { session: false }), controller.update)
roomRoutes.route('/delete/:id').delete(passport.authenticate('bearer', { session: false }), controller.delete)


export default roomRoutes