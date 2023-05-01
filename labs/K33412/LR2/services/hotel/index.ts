import Hotel from '../../models/hotel/Hotel'
import { sequelize } from '../../config/config'

export default class BookingService {

    private repo = sequelize.getRepository(Hotel)
    
    add(hotel: any) {
        return this.repo.create(hotel)
    }

    getFiltered(city_param: string, min_rating: number) {
        const { Op } = require("sequelize")
        return this.repo.findAll( { where: { city: city_param, rating: { [Op.gte]: min_rating } } } )
    }
}

