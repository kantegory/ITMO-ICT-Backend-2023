import EventModel from '../models/eventModel'
import EventError from '../errors/eventError'
import PlaceService from './placeService'
import EventTypeService from './eventTypeService'

const placeService = new PlaceService()
const eventTypeService = new EventTypeService()

class EventService {
    async findById(id: number): Promise<EventModel> {
        const event: EventModel | null = await EventModel.findByPk(id)
        if (event) return event.toJSON()
        throw new EventError('Not found!')
    }

    async getById(id: number): Promise<EventModel> {
        return await this.findById(id)
    }

    async getAll(query: any): Promise<EventModel[]> {
        const {sort, placeId, eventTypeId, desc, offset, limit} = query
        const req = {
            where: {}
        }

        try {
            if (sort == 'name' || sort == 'date') {
                if (!desc || desc == 0) {
                    // @ts-ignore
                    req['order'] = [[sort, 'ASC']]
                } else {
                    // @ts-ignore
                    req['order'] = [[sort, 'DESC']]
                }
            }
            if (eventTypeId) {
                await eventTypeService.findById(eventTypeId)
                // @ts-ignore
                req['where']['eventTypeId'] = eventTypeId
            }
            if (placeId) {
                await placeService.findById(placeId)
                // @ts-ignore
                req['where']['placeId'] = placeId
            }
            if (limit) {
                // @ts-ignore
                req['limit'] = limit
            }
            if (offset) {
                // @ts-ignore
                req['offset'] = offset
            }
        } catch (e: any) {
            throw new EventError(e.message)
        }

        return await EventModel.findAll(req)
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
