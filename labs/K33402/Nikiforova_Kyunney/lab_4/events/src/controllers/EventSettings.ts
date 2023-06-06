import EventSettingsService from "../services/EventSettings"

export class EventSettingsController {
    private eventSettingsService: EventSettingsService

    constructor() {
        this.eventSettingsService = new EventSettingsService()
    }
    get = async (request: any, response: any) => {
        try {
            const events = await this.eventSettingsService.get(
                Number(request.user.id)
            )
            response.send(events)
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }

    post = async (request: any, response: any) => {
        const event = request.body
        event.authorId = request.user.id
        try {
            await this.eventSettingsService.create(event)
            response.status(200).send({"status": "OK"})
        }
        catch (error: any) {
            response.status(400).send({ "error" : error.message })
        }
    }

    update = async (request: any, response: any) => {
        const updatedEvent = request.body
        updatedEvent.authorId = request.user.id
        const eventId = request.params.id
        try {
            const event = await this.eventSettingsService.updateByID(eventId, updatedEvent)
            response.send(event)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        const deletedEvent = request.body
        deletedEvent.authorId = request.user.id
        const eventId = request.params.id
        try {
            await this.eventSettingsService.deleteByID(eventId, deletedEvent)
            response.status(204).send({"status": "OK"})
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    join = async (request: any, response: any) => {
        const userAndEvent = request.body
        userAndEvent.userId = request.user.id

        try {
            const result = await this.eventSettingsService.join(userAndEvent)
                response.send(result)
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }
}