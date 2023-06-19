import { Optional } from 'sequelize'
import Room from '../../models/room/Room'
import RoomError from '../../errors/room/Room'

class RoomService {
    async listOfHotelsRoom(id: number): Promise<Room[]> {
        return await Room.findAll({ where: { hotelId: id } })
    }

    async create(roomData: Optional<string, any>): Promise<Room | RoomError> {
        try {
            const room = await Room.create(roomData)

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
        const room = await Room.findOne({where: {roomNumber: roomNumber}})
        if (!room) {
            throw new RoomError('Room not found');
          }
        
          Object.assign(room, newRoomData)
          return await room.save()
    }

    async deleteRoom(roomNumber: number) {
            const room = await Room.findOne({where: {roomNumber: roomNumber}})
            if (room == null) {
                throw new Error("Invalid identifier")
            }
    
            return await room.destroy()
        }
    }

export default RoomService