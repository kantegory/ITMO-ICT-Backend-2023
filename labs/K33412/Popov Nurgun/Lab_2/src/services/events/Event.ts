import Event from "../../models/events/Event"
import Author from "../../models/authors/Author"
import sequelize from "sequelize"

class EventService {
    async create(eventData: any): Promise<Event> {
        const author = await Author.findByPk(eventData.authorId)

        if (author) {
            const event = await Event.create(eventData)
            return event.toJSON()
        }
        throw new Error(`Author with id ${eventData.authorId} not found`)
    }

    async getByID(id: number): Promise<Event|Error> {
        const event = await Event.findByPk(id)

        if (event) {
            return event.toJSON()
        }
        throw new Error(`Event with id ${id} not found`)
    }

    async update(id: number, eventData: any): Promise<Event> {
        const event = await Event.findByPk(id)

        if (event) {
            await event.update(eventData)
            return event.toJSON()
        }
        throw new Error(`Event with id ${id} not found`)
    }

    async deleteByID(id: number){
        const event = await Event.findByPk(id)

        if (event) {
            return await Event.destroy({ where: { id } })
        }
        throw new Error(`Event with id ${id} not found`)
    }

    async filter(params: any): Promise<any> {
        return await Event.findAll({where: params})
    }

    async calendarGet() {
        return await Event.findAll({order: sequelize.col('date')})
    }

    async getByAuthor(id: number){
        const event = await Event.findAll({where: {authorId: id}, order: sequelize.col('date')})

        if (event) {
            return event
        }
        throw new Error(`Company with name id ${id} not found`)
    }
}

export default EventService