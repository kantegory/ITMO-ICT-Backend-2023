import Hotel from "../../models/hotels/Hotel";
import HotelError from "../../errors/hotels/Hotel";
import { Optional } from "sequelize";

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

    async getByCity(city: string) {
        return await Hotel.findAll({ where: { city: city } })
    }

    async getByName(name: string) {
        return await Hotel.findAll({ where: { name: name } })
    }
}

export default HotelService
