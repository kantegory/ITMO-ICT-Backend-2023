import BookingService from '../../services/booking/Booking'
import { Request, Response } from 'express'

class BookingController {
    private bookingService: BookingService

    constructor() {
        this.bookingService = new BookingService()
    }

    getById = async (request: Request, response: Response) => {
        try {
            const booking = await this.bookingService.getById(Number(request.params.id))
            response.send(booking)
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }

    post = async (request: Request, response: Response) => {
        const { body } = request

        const userId = (request.user as any)?.id
        
        if (!userId) return response.status(401).send({ error: 'Only for auth' })

        try {
            const booking = await this.bookingService.create({ ...body, userId })
            response.status(201).send(booking)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const { body } = request
            const { id } = request.params
            const booking =  await this.bookingService.updateBooking(Number(id), body)

            response.send(booking)
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.bookingService.deleteBooking(request.params.id)
            response.sendStatus(200)
        }
        catch (error: any) {
            response.sendStatus(400)
        }
}

}

export default BookingController