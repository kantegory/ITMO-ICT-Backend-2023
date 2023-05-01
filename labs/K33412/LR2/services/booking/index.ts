import Booking from '../../models/booking/Booking'
import { sequelize } from '../../config/config'

export default class BookingService {

    private repo = sequelize.getRepository(Booking)
    
    add(booking: any) {
        return this.repo.create(booking)
    }

    getForUser(user: number) {
        return this.repo.findAll({ where: { userId: user } })
    }
}

