import Event from '../models/events'
import EventError from '../errors/event'

class EventService {
    async getById(id: number) : Promise<Event> {
        console.log('by id')
        const event = await Event.findByPk(id)

        if (event) return event.toJSON()

        throw new EventError('Not found!')
    }

    async create(eventData: Partial<Event>): Promise<Event> {
        try {
            const event = await Event.create(eventData)

            return event.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new EventError(errors)
        }
    }

    async getAll() {
        const events = await Event.findAll()

        if (events) return events

        throw new EventError('Events are not found')
    }

    async getByType(type: number) {
        const events = await Event.findAll({where: {type: type}})

        if (events) return events

        throw new EventError('Events with such type are not found')
    }

    async getByPlace(place: number) {
        const events = await Event.findAll({where: {place: place}})

        if (events) return events

        throw new EventError('Events with such place are not found')
    }

    async getByOrganizer(organizer: number) {
        const events = await Event.findAll({where: {organizer: organizer}})

        if (events) return events

        throw new EventError('Events with such organizer are not found')
    }

    async getCalendar() {
        console.log('calendar')
        const events = await Event.findAll({order: [['data', 'ASC']]})

        if (events) return events

        throw new EventError('Events are not found')
    }
}

export default EventService