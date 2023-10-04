import EventService from '../../services/events/Event'

class EventController {
    private eventService: EventService

    constructor() {
        this.eventService = new EventService()
    }

    get = async (request: any, response: any) => {
        try {
            const event = await this.eventService.getById(Number(request.params.id))
            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request
        try {
            const event = await this.eventService.create(body)
            response.status(200).send(event)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const id = Number(request.params.id)
        try {
            const event = await this.eventService.update(id, body)
            response.send(event)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        const id = Number(request.params.id)
        try {
            await this.eventService.delete(id)
            response.status(200).send({ message: `Event with id ${id} has been deleted` })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    getByParams = async (request: any, response: any) => {
        const params = request.body
        try {
            const event = await this.eventService.getByParams(params)
            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default EventController