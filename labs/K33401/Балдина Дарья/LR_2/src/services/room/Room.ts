import { Optional } from 'sequelize'
import Room from '../../models/room/Room'
import RoomError from '../../errors/room/Room'

class RoomService {
    async listOfHotelsRoom(id: number): Promise<Room[]> {
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

    async getByRoomNumber(roomNumber: number): Promise<Room> {
        const room = await Room.findOne({where: {roomNumber: roomNumber}})
        if (room) return room.toJSON()

        throw new RoomError('Not found!')
    }

    async updateRoom(roomNumber: number, newRoomData: any){
        const room = await this.getByRoomNumber(roomNumber)
        
        if (!room) {
            throw new RoomError('Hotel not found');
          }
        
          Object.assign(room, newRoomData)
          return await room.save()
    }

    async deleteRoom(roomNumber: number) {
        const room: Room = await this.getByRoomNumber(roomNumber)
        room.destroy()
    }
}

export default RoomService