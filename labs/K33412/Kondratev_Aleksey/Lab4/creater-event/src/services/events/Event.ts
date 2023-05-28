import Event from '../../models/events/Event'
import sequelize from '../../providers/db'

const eventRepository = sequelize.getRepository(Event)

class EventService {
    async getById(id: number): Promise<Event> {
        const event = await eventRepository.findOne({ where: { 'id': id } })
        if (event) return event
        throw new Error(`Events with id ${id} not found`)
    }

    async create(eventData: Partial<Event>): Promise<Event> {
        try {
            const event = await eventRepository.create(eventData)
            return event.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw console.log(errors)
        }
    }

    async update(id: number, eventData: Partial<Event>): Promise<Event> {
        try {
            const event = await eventRepository.findOne({ where: { 'id': id } })
            if (event) {
                await event.update(eventData)
                return event.toJSON()
            }
            throw new Error(`Events with id ${id} not found`)
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw console.log(errors)
        }
    }

    async delete(id: number): Promise<void> {
        const event = await eventRepository.findOne({ where: { 'id': id } })
        if (event) {
            await event.destroy()
            return
        }
        throw new Error(`Events with id ${id} not found`)
    }

    async getByParams(params: any): Promise<any> {
        const result = await eventRepository.findAll({ where: params });
        return result;
    }
}

export default EventService