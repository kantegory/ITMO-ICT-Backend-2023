import TicketService from '../../services/ticket/TicketService'

export default class TicketController {

    private service = new TicketService()

    add = async (request: any, response: any) => {
        try {
            const ticket = request.body
            ticket.userId = request.user.id
            const result = await this.service.add(ticket)
            response.send({ id: result.id })
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
