import Booking from '../../models/booking/Booking'
import BookingError from '../../errors/booking/Booking'
import { Optional } from 'sequelize'
import Room from '../../../../hotel-room/src/models/room/Room'
import axios from 'axios'


class BookingService {
    async create(bookingData: Optional<string, any>): Promise<Room> {
        const roomId = bookingData['roomNumber']
        const { arrivalDate, departureDate } = bookingData
        if (!roomId) throw new BookingError('roomId must be specified')
        if (!arrivalDate || !departureDate) throw new BookingError('arrivalDate and departureDate must be specified')

        const arrivalDateTime = new Date(arrivalDate).getTime()
        const departureDateTime = new Date(departureDate).getTime()

        const findRoom = async (roomNumber:any) => {
            try {
              const response = await axios.get(`http://localhost:9091/v1/room/number/${roomNumber}`);
          
              const room = response.data;
              return room;
            } catch (error) {
              // Обработка ошибки
              console.error(error);
              return null;
            }
          };

        const room = await findRoom(roomId) 


        if (!room) throw new BookingError('Such room not found!')

        const roomBookings = await Booking.findAll({ where: { roomNumber: room.roomNumber } })

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