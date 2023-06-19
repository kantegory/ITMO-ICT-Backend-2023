import EventService from "../services/Event"

export class EventController {
    private eventService: EventService;

    constructor() {
        this.eventService = new EventService();
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

    author = async  (request: any, response: any) => {
        const eventId = request.params.id
        try {
            const event = await this.eventService.getByAuthorId(eventId)
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

    filter = async (request: any, response: any) => {
        const params = request.body
        try {
            const event = await this.eventService.filter(params)
            response.send(event)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}