import Ticket from '../../models/ticket/ticket'
import { sequelize } from '../../config/config'

export default class TicketService {

    private repo = sequelize.getRepository(Ticket)
    
    add(ticket: any) {
        return this.repo.create(ticket)
    }

    getForUser(user: number) {
        return this.repo.findAll({ where: { userId: user } })
    }
}

