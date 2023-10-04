import UserEventService from "../../services/users/UserEvent";

export class UserEventController {
    private UserEventService: UserEventService;

    constructor() {
        this.UserEventService = new UserEventService();
    }

    addEvent = async (request: any, response: any) => {
        const userAndEvent = request.body
        userAndEvent.userId = request.user.id
        try {
            const result = await this.UserEventService.addEvent(userAndEvent)
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