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
        if (!arrivalDate || !departureDate) throw new BookingError('arrivalDate and departureDate must be specified')

        const arrivalDateTime = new Date(arrivalDate).getTime()
        const departureDateTime = new Date(departureDate).getTime()

        const room = await Room.findOne({where: {roomNumber: roomId}})

        if (!room) throw new BookingError('Such room not found!')

        const roomBookings = await Booking.findAll({ where: { roomId: room.roomNumber } })

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
            throw new BookingError(e)
        }
    }

    async getById(id: number): Promise<Booking> {
        const booking = await Booking.findByPk(id)

        if (booking) return booking.toJSON()

        throw new BookingError('Not found!')
    }

    async updateBooking(id: number, newBookingData: any){
        const booking = await Booking.findByPk(id)
        
        if (!booking) {
            throw new BookingError('Hotel not found');
          }
        
          Object.assign(booking, newBookingData)
          return await booking.save()
    }

    async deleteBooking(id: number) {
        const booking = await Booking.findByPk(id)
        if (booking == null) {
            throw new Error("Invalid identifier")
        }
        return await booking.destroy()
    }
}

export default BookingService