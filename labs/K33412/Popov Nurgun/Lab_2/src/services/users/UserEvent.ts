import UserEvent from "../../models/users/UserEvent"
import Event from "../../models/events/Event"

class UserEventService {
    async addEvent(userAndEvent: any) {
        const foundEvent = await Event.findByPk(userAndEvent.eventId)
        if (foundEvent == null) {
            throw new Error("There is no such Event")
        }
        const res = await UserEvent.findAll({ where: { userId: userAndEvent.userId, eventId: userAndEvent.eventId }})
        if (res.length > 0) {
            throw new Error("You have already signed up for this event")
        }
        return await UserEvent.create(userAndEvent)
    }

    async getEvent(userId: number) {
        return UserEvent.findAll({ where: { userId: userId } })
    }
}

export default UserEventService