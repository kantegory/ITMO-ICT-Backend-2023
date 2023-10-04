import EventService from "../services/Event"

class EventController {
    private eventService: EventService = new EventService()

    add = async (request: any, response: any) => {
        try {
            const result = await this.eventService.create(request.body)
            response.send({ id: result.id })
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const id = request.params.id
        try {
            const event = await this.eventService.update(Number(id), body)
            response.send(event)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        const id = request.params.id
        try {
            await this.eventService.delete(Number(id))
            response.status(200).send({ message: `Event with id ${id} has been deleted` })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    getById = async (request: any, response: any) => {
        const id = request.params.id
        try {
            const event = await this.eventService.getById(Number(id))
            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }


    getEvents = async (request: any, response: any) => {
        try {
            const data = await this.eventService.getByFilter(request.body)
            response.send(data)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}

export default EventController
