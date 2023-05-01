import BookingService from '../../services/booking/index'

export default class BookingController {

    private service = new BookingService()

    post = async (request: any, response: any) => {
        try {
            const booking = request.body
            booking.userId = request.user.id
            await this.service.add(booking)
            response.send('Successfully added')
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    get = async (request: any, response: any) => {
        try {
            const data = await this.service.getForUser(request.user.id)
            response.send(data)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}
