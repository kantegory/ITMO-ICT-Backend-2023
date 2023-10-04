import { Optional } from 'sequelize'
import Room from '../../models/hotels/Room'
import RoomError from '../../errors/hotels/Room'

class RoomService {
    async listForHotel(id: number): Promise<Room[]> {
        return await Room.findAll({ where: { hotelId: id } })
    }

    async create(hotelData: Optional<string, any>): Promise<Room | RoomError> {
        try {
            const room = await Room.create(hotelData)

            return room.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new RoomError(errors)
        }
    }

    async getByCapacity(hotelId: number, capacity: number): Promise<Room[] | RoomError> {
        try {
            return await Room.findAll({ where: { hotelId: hotelId, capacity: capacity } })
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new RoomError(errors)
        }
    }
}

export default RoomService
