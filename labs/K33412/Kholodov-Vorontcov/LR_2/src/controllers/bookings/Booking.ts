import BookingService from '../../services/bookings/Booking'
import { Request, Response } from 'express'

class BookingController {
    private bookingService: BookingService

    constructor() {
        this.bookingService = new BookingService()
    }

    create = async (request: Request, response: Response) => {
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
}

export default BookingController
