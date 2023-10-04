import Event from '../models/Event'
import sequelize from '../providers/db'

const eventRepository = sequelize.getRepository(Event)

class EventService {

    async create(event: any) {
        try{
            const new_event = await eventRepository.create(event)
            return new_event.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw console.log(errors)
        }
    }

    async update(id: number, eventData: Partial<Event>): Promise<Event> {
        try {
            const event = await eventRepository.findByPk(id)
            if (event) {
                await event.update(eventData)
                return event.toJSON()
            }
            throw new Error(`Event with id ${id} not found`)
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw console.log(errors)
        }
    }

    async delete(id: number): Promise<void> {
        const event = await eventRepository.findByPk(id)
        if (event) {
            await event.destroy();
            return;
        }
        throw new Error(`Event with id ${id} not found`);
    }

    async getById(id: number): Promise<Event> {
        const event = await eventRepository.findByPk(id)
        if (event) return event
        throw new Error(`Events with id ${id} not found`)
    }

    async getByFilter(params: any) {
        const events = await eventRepository.findAll({ where: params })
        if (events) return events
        throw new Error("Events not found!")
    }
}

export default EventService
