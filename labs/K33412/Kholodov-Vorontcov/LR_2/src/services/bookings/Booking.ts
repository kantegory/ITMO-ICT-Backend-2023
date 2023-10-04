import Booking from '../../models/bookings/Booking'
import BookingError from '../../errors/bookings/Booking'
import { Optional } from 'sequelize'
import Room from '../../models/hotels/Room'
import RoomError from '../../errors/hotels/Room'

class BookingService {
    async create(bookingData: Optional<string, any>): Promise<Room | RoomError> {
        const roomId = bookingData['roomId']
        const { dateFrom, dateTo } = bookingData
        if (!roomId) throw new BookingError('roomId must be specified')
        if (!dateFrom || !dateTo) throw new BookingError('dateFrom and dateTo must be specified')

        const dateFromTime = new Date(dateFrom).getTime()
        const dateToTime = new Date(dateTo).getTime()

        const room = await Room.findByPk(roomId)

        if (!room) throw new BookingError('Such room not found!')

        const roomBookings = await Booking.findAll({ where: { roomId: room.id } })

        let possible = true
        roomBookings.forEach((booking) => {
            if (!possible) return

            const bookingDateFromTime = booking.dateFrom.getTime()
            const bookingDateToTime = booking.dateTo.getTime()

            const isIntersect = Boolean(
                (dateFromTime > bookingDateFromTime && dateFromTime < bookingDateToTime) ||
                    (dateToTime > bookingDateFromTime && dateToTime < bookingDateToTime) ||
                    (dateFromTime === bookingDateFromTime && dateToTime === bookingDateToTime)
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
}

export default BookingService
