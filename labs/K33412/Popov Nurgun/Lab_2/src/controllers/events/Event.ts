import EventService from "../../services/events/Event"

export class EventController {
    private eventService: EventService;

    constructor() {
        this.eventService = new EventService();
    }

    create = async (request: any, response: any) => {
        const { body } = request
        try {
            await this.eventService.create(body)
            response.status(200).send({"status": "OK"})
        }
        catch (error: any) {
            response.status(400).send({ "error" : error.message })
        }
    }

    get = async (request: any, response: any) => {
        const eventId = request.params.id
        try {
            const event = await this.eventService.getByID(eventId)
            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const eventId = request.params.id
        try {
            const event = await this.eventService.update(eventId, body)
            response.send(event)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        const eventId = request.params.id
        try {
            await this.eventService.deleteByID(eventId)
            response.status(204).send("Event deleted")
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    filter = async (request: any, response: any) => {
        const params = request.body
        try {
            const event = await this.eventService.filter(params)
            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    calendar = async (request: any, response: any) => {
        try {
            const event = await this.eventService.calendarGet()
            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    author = async  (request: any, response: any) => {
        const eventId = request.params.id
        try {
            const event = await this.eventService.getByAuthor(eventId)
            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}