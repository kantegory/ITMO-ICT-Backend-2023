import HotelService from '../../services/hotel/Hotel'
import { Request, Response } from 'express'
import Hotel from "../../models/hotel/Hotel"

class HotelController {
    private hotelService: HotelService

    constructor() {
        this.hotelService = new HotelService()
    }

    list = async (request: Request, response: Response) => {
        const hotels = await this.hotelService.list()
        response.status(200).send(hotels)
    }

    get = async (request: Request, response: Response) => {
        try {
            const hotel = await this.hotelService.getById(Number(request.params.id))
            response.send(hotel)
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }

    post = async (request: Request, response: Response) => {
        const { body } = request

        try {
            const hotel = await this.hotelService.create(body)

            response.status(201).send(hotel)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    getByName = async (request: Request, response: Response) => {
        try {
            const hotel = await this.hotelService.getByName(request.params.name)

            response.status(201).send(hotel)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    
    update = async (request: any, response: any) => {
            try {
                const { body } = request
                const { id } = request.params
                const hotel = await this.hotelService.updateHotel(Number(id), body)
    
                response.send(hotel)
            }
            catch (error: any) {
                response.status(400).send(error.message)
            }
        }

    delete = async (request: any, response: any) => {
            try {
                await this.hotelService.deleteHotel(request.params.id)
                response.sendStatus(200)
            }
            catch (error: any) {
                response.sendStatus(400)
            }
    }
}

export default HotelController