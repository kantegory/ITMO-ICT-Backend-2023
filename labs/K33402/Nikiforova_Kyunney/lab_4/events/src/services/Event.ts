import Event from "../models/Event"
import sequelize from "sequelize"

class EventService {
    async getByID(id: number): Promise<Event|Error> {
        const event = await Event.findByPk(id)
        if (event) {
            return event.toJSON()
        }
        throw new Error(`Event with id ${id} not found`)
    }

    async filter(params: any): Promise<any> {
        return await Event.findAll({where: params})
    }

    async calendarGet() {
        return await Event.findAll({order: sequelize.col('date')})
    }

    async getByAuthorId(id: number){
        const event = await Event.findAll({where: {authorId: id}, order: sequelize.col('date')})
        if (event) {
            return event
        }
        throw new Error(`Company with name id ${id} not found`)
    }
}

export default EventService