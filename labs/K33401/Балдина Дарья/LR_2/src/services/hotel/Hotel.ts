import Hotel from "../../models/hotel/Hotel"
import HotelError from "../../errors/hotel/Hotel"
import { Optional } from "sequelize"

class HotelService {
    async list(): Promise<Hotel[]> {
        return await Hotel.findAll()
    }

    async create(hotelData: Optional<string, any>): Promise<Hotel | HotelError> {
        try {
            const hotel = await Hotel.create(hotelData)

            return hotel.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new HotelError(errors)
        }
    }

    async getById(id: number): Promise<Hotel> {
        const hotel = await Hotel.findByPk(id)

        if (hotel) return hotel.toJSON()

        throw new HotelError('Not found!')
    }

    async getByName(name: string) {
        return await Hotel.findOne({ where: { name: name } })
    }


    async updateHotel(id: number, newHotelData: any){
        const hotel = await Hotel.findByPk(id)
        
        if (!hotel) {
            throw new HotelError('Hotel not found');
          }
        
          Object.assign(hotel, newHotelData)
          return await hotel.save()
    }

    async deleteHotel(id: number) {
        const hotel: Hotel = await this.getById(id)
        hotel.destroy()
    }
}

export default HotelService