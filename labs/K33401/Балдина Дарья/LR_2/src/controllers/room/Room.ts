import RoomService from '../../services/room/Room'
import { Request, Response } from 'express'

class RoomController {
    private roomService: RoomService

    constructor() {
        this.roomService = new RoomService()
    }

    list = async (request: Request, response: Response) => {
        const rooms = await this.roomService.listOfHotelsRoom(Number(request.params.id))
        response.status(200).send(rooms)
    }

    post = async (request: Request, response: Response) => {
        const { body } = request
        const hotelId = Number(request.body.hotelId)

        const roomData = { ...body, hotelId: hotelId }

        try {
            const room = await this.roomService.create(roomData)

            response.status(201).send(room)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    getByRoomNumber = async (request: Request, response: Response) => {
        try {
            const room = await this.roomService.getByRoomNumber(
                Number(request.params.roomNumber)
            )

            response.status(200).send(room)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const { body } = request
            const { id } = request.params
            const room = await this.roomService.updateRoom(Number(id), body)

            response.send(room)
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.roomService.deleteRoom(request.params.id)
            response.sendStatus(200)
        }
        catch (error: any) {
            response.sendStatus(400)
        }
}
}

export default RoomController