import Booking from '../../models/booking/Booking'
import BookingError from '../../errors/booking/Booking'
import { Optional } from 'sequelize'
import Room from '../../models/room/Room'
import RoomError from '../../errors/room/Room'

class BookingService {
    async create(bookingData: Optional<string, any>): Promise<Room | RoomError> {
        const roomId = bookingData['roomId']
        const { arrivalDate, departureDate } = bookingData
        if (!roomId) throw new BookingError('roomId must be specified')
        if (!arrivalDate || !departureDate) throw new BookingError('dateFrom and dateTo must be specified')

        const arrivalDateTime = new Date(arrivalDate).getTime()
        const departureDateTime = new Date(departureDate).getTime()

        const room = await Room.findByPk(roomId)

        if (!room) throw new BookingError('Such room not found!')

        const roomBookings = await Booking.findAll({ where: { roomId: room.id } })

        let possible = true
        roomBookings.forEach((booking) => {
            if (!possible) return

            const bookingArrivalDateTime = booking.arrivalDate.getTime()
            const bookingDepartureDateTime = booking.departureDate.getTime()

            const isIntersect = Boolean(
                (departureDateTime > bookingDepartureDateTime && departureDateTime < bookingArrivalDateTime) ||
                    (arrivalDateTime > bookingDepartureDateTime && arrivalDateTime < bookingArrivalDateTime) ||
                    (departureDateTime === bookingDepartureDateTime && bookingArrivalDateTime===bookingArrivalDateTime)
            )

            if (isIntersect) {
                possible = false
            }
        })

        if (!possible) throw new BookingError('Cant book this room for this period! Room is busy')

        try {
            const booking = await Booking.create(bookingData)

            return booking.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new BookingError(errors)
        }
    }

    async getById(id: number): Promise<Booking> {
        const booking = await Booking.findByPk(id)

        if (booking) return booking.toJSON()

        throw new BookingError('Not found!')
    }
    
    async updateBooking(newBookingData: any) {
        await Booking.update(newBookingData, {
            where: {
                id: newBookingData.id
            }
        })
        console.log(newBookingData.id)
        return this.getById(newBookingData.id)
    }

    async deleteBooking(id: number) {
        const booking: Booking = await this.getById(id)
        booking.destroy()
    }
}

export default BookingService