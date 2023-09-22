import EventModel from '../models/eventModel'
import EventError from '../errors/eventError'

class EventService {
    async findById(id: number): Promise<EventModel> {
        const event: EventModel | null = await EventModel.findByPk(id)
        if (event) return event.toJSON()
        throw new EventError('Not found!')
    }

    async getById(id: number): Promise<EventModel> {
        return await this.findById(id)
    }

    async getAll(): Promise<EventModel[]> {
        return await EventModel.findAll()
    }

    async update(id: number, eventData: object): Promise<EventModel | EventError> {
        try {
            await this.findById(id)
            await EventModel.update(eventData, {where: {id}})
            return await this.findById(id)
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new EventError(errors)
        }
    }

    async delete(id: number): Promise<EventModel> {
        try {
            const deletedEvent: EventModel = await this.findById(id)
            await EventModel.destroy({where: {id}})
            return deletedEvent
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new EventError(errors)
        }
    }

    async create(eventData: any): Promise<EventModel | EventError> {
        try {
            const event = await EventModel.create(eventData)
            return event.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new EventError(errors)
        }
    }
}

export default EventService
