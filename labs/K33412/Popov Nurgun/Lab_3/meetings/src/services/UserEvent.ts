import UserEvent from "../models/UserEvent"
import Event from "../models/Event"

class UserEventService {
    async createEvent(eventData: any): Promise<Event> {
        const event = await Event.create(eventData)
        return event.toJSON()
    }

    async updateEventByID(id: number, eventData: any) {
        const event = await Event.findByPk(id)

        if (event) {
            const res = await Event.findAll({ where: { id:id, authorId: eventData.authorId }})
            if (res.length > 0) {
                await event.update(eventData)
                return event.toJSON()
            }
            throw new Error(`You are not author of event with id ${id}`)
        }
        throw new Error(`Event with id ${id} not found`)
    }

    async deleteEventByID(id: number, eventData: any){
        const event = await Event.findByPk(id)

        if (event) {
            const res = await Event.findAll({ where: { id: id, authorId: eventData.authorId }})
            if (res.length > 0) {
                return await Event.destroy({ where: { id } })
            }
            throw new Error(`You are not author of event with id ${id}`)
        }
        throw new Error(`Event with id ${id} not found`)
    }

    async joinTheEvent(userAndEvent: any) {
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