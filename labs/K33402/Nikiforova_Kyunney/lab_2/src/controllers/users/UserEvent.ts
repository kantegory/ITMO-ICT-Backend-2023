import UserEventService from "../../services/users/UserEvent";

export class UserEventController {
    private UserEventService: UserEventService;

    constructor() {
        this.UserEventService = new UserEventService();
    }

    createEvent = async (request: any, response: any) => {
        const event = request.body
        event.authorId = request.user.id
        try {
            await this.UserEventService.createEvent(event)
            response.status(200).send({"status": "OK"})
        }
        catch (error: any) {
            response.status(400).send({ "error" : error.message })
        }
    }

    updateEvent = async (request: any, response: any) => {
        const updatedEvent = request.body
        updatedEvent.authorId = request.user.id
        const eventId = request.params.id
        try {
            const event = await this.UserEventService.updateEventByID(eventId, updatedEvent)
            response.send(event)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    deleteEvent = async (request: any, response: any) => {
        const deletedEvent = request.body
        deletedEvent.authorId = request.user.id
        const eventId = request.params.id
        try {
            await this.UserEventService.deleteEventByID(eventId, deletedEvent)
            response.status(204).send({"status": "OK"})
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    joinTheEvent = async (request: any, response: any) => {
        const userAndEvent = request.body
        userAndEvent.userId = request.user.id
        try {
            const result = await this.UserEventService.joinTheEvent(userAndEvent)
                response.send(result)
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }

    getEvent = async (request: any, response: any) => {
        try {
            const events = await this.UserEventService.getEvent(
                Number(request.user.id)
            )

            response.send(events)
        } catch (error: any) {
            response.status(400).send({"error": error.message})
        }
    }
}