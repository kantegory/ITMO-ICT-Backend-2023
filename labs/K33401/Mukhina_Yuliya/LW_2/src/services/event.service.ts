import Event from '../models/event.model'

class EventService {
    async getById(id: number): Promise<Event> {
        const event: Event | null = await Event.findByPk(id)
        if (event) return event.toJSON()
        throw new Error('Not found!')
    }

    async getAll(queryparams: any): Promise<Event[]> {
        const {type, sort, order} = queryparams
        const options = {where: {}}
        try {
            if (sort && order) {
                // @ts-ignore
                options['order'] = [[sort, order]]
            }
            if (type) {
                // @ts-ignore
                options['where']['type'] = type
            }
            return await Event.findAll(options)
        } catch (e: any) {
            throw new Error(e.message)
        }
    }

    async create(data: any): Promise<Event | Error> {
        try {
            const event = await Event.create(data)
            return event.toJSON()
        } catch (e: any) {
            throw new Error(e.message)
        }
    }

    async update(id: number, data: object): Promise<Event | Error> {
        try {
            await this.getById(id)
            await Event.update(data, {where: {id}})
            return await this.getById(id)
        } catch (e: any) {
            throw new Error(e.message)
        }
    }

    async delete(id: number): Promise<Event> {
        try {
            const event: Event = await this.getById(id)
            await Event.destroy({where: {id}})
            return event
        } catch (e: any) {
            throw new Error(e.message)
        }
    }
}

export default EventService