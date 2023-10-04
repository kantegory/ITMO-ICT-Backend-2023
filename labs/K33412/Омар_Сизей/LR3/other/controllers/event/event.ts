import EventService from '../../services/event/EventService'

export default class EventController {

    private service = new EventService()

    add = async (request: any, response: any) => {
        try {
            const result = await this.service.add(request.body)
            response.send({ id: result.id })
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const data = await this.service.getAll()
            response.send(data)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    getFiltered = async (request: any, response: any) => {
        try {
            const data = await this.service.getByFilter(request.query.city, request.query.type)
            response.send(data)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}
