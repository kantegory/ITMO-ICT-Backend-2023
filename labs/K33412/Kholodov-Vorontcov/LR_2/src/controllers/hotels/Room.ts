import RoomService from '../../services/hotels/Room'
import { Request, Response } from 'express'

class RoomController {
    private roomService: RoomService

    constructor() {
        this.roomService = new RoomService()
    }

    list = async (request: Request, response: Response) => {
        const hotels = await this.roomService.listForHotel(Number(request.params.id))
        response.status(200).send(hotels)
    }

    create = async (request: Request, response: Response) => {
        const { body } = request
        const hotelId = Number(request.params.id)

        const roomData = { ...body, hotelId: hotelId }

        try {
            const room = await this.roomService.create(roomData)

            response.status(201).send(room)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    getByCapacity = async (request: Request, response: Response) => {
        try {
            const hotel = await this.roomService.getByCapacity(
                Number(request.params.id),
                Number(request.params.capacity)
            )

            response.status(200).send(hotel)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }
}

export default RoomController
