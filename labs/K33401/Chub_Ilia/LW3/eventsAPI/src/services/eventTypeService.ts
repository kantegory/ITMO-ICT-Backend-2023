import EventTypeModel from '../models/eventTypeModel'
import EventTypeError from '../errors/eventTypeError'

class EventTypeService {
    async findById(id: number): Promise<EventTypeModel> {
        const eventType: EventTypeModel | null = await EventTypeModel.findByPk(id)
        if (eventType) return eventType.toJSON()
        throw new EventTypeError('Not found!')
    }

    async getById(id: number): Promise<EventTypeModel> {
        return await this.findById(id)
    }

    async getAll(): Promise<EventTypeModel[]> {
        return await EventTypeModel.findAll()
    }

    async update(id: number, eventTypeData: object): Promise<EventTypeModel | EventTypeError> {
        try {
            await this.findById(id)
            await EventTypeModel.update(eventTypeData, {where: {id}})
            return await this.findById(id)
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new EventTypeError(errors)
        }
    }

    async delete(id: number): Promise<EventTypeModel> {
        try {
            const deletedEventType: EventTypeModel = await this.findById(id)
            await EventTypeModel.destroy({where: {id}})
            return deletedEventType
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new EventTypeError(errors)
        }
    }

    async create(eventTypeData: any): Promise<EventTypeModel | EventTypeError> {
        try {
            const eventType = await EventTypeModel.create(eventTypeData)
            return eventType.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new EventTypeError(errors)
        }
    }
}

export default EventTypeService
