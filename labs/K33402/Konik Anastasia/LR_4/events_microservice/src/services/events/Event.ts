import Event from '../../models/events/Event'
import EventError from "../../errors/events/Event"

class EventService {
    async getAll(): Promise<Event[]> {
        return await Event.findAll()
    }

    async create(eventData: any): Promise<Event|EventError> {
        try {
            const event = await Event.create(eventData)

            return event.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new EventError(errors)
        }
    }

    async getById(id: number): Promise<Event> {
        const event = await Event.findByPk(id)

        if (event) return event.toJSON()

        throw new EventError('Not found')
    }

    async d_filter(district: string): Promise<Event[]|EventError> {
        const events_d = await Event.findAll({where: {district: district}})

        if (events_d) return events_d

        throw new EventError('Events in this district not found')
    }

    async t_filter(ev_type: string): Promise<Event[]|EventError> {
        const events_t = await Event.findAll({where: {ev_type: ev_type}})

        if (events_t) return events_t

        throw new EventError('Events of this type not found')
    }
}

export default EventService
