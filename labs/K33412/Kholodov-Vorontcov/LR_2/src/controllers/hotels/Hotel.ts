import HotelService from '../../services/hotels/Hotel'
import { Request, Response } from 'express'

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

    getByCity = async (request: Request, response: Response) => {
        try {
            const hotels = await this.hotelService.getByCity(request.params.city)

            response.status(200).send(hotels)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    getByName = async (request: Request, response: Response) => {
        try {
            const hotels = await this.hotelService.getByName(request.params.name)

            response.status(201).send(hotels)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }
}

export default HotelController
