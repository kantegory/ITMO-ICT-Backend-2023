import express from 'express'
import HotelController from '../../../controllers/hotels/Hotel'
import RoomController from "../../../controllers/hotels/Room";

const hotelsRoutes = express.Router()

const hotelController = new HotelController()
const roomController = new RoomController()

hotelsRoutes.route('/').get(hotelController.list)
hotelsRoutes.route('/').post(hotelController.post)

hotelsRoutes.route('/city/:city').get(hotelController.getByCity)
hotelsRoutes.route('/name/:name').get(hotelController.getByName)

hotelsRoutes.route('/:id').get(hotelController.get)

hotelsRoutes.route('/:id/rooms').post(roomController.create)
hotelsRoutes.route('/:id/rooms').get(roomController.list)

hotelsRoutes.route('/:id/rooms/capacity/:capacity').get(roomController.getByCapacity)

export default hotelsRoutes
