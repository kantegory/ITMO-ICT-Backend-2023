import { userInfo } from "os"
import EventError from "../errors/events/event"
import Event from "../models/event"


class EventService {
    async getById(id: string){
        const user = await Event.findByPk(id)

        if (user) return user.toJSON()

        throw new EventError('Not found!')

    }

    async create(event: any): Promise<Event|Error>{
        try {
            const eventData = await Event.create(event)
            return eventData
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new EventError(errors)
        }
    }

    async listEvents(){
        const events = await Event.findAll()

        if (events) return events

        throw new EventError('Not found!')
    }

    // async updateUser(id:string, data: any) {
    //     try {
    //         const user = await Event.findByPk(id)
    //         if (user) {
    //             user.update(data)
    //         }
    //         return user
    //     } catch (e: any) {
    //         const errors = e.errors.map((error: any) => error.message)

    //         throw new EventError(errors)
    //     }
    // }
    
    // async deleteUser(id:string) {
    //     try {
    //         await Event.destroy({where: {id:id}})
    //     } catch (e: any) {
    //         const errors = e.errors.map((error: any) => error.message)

    //         throw new EventError(errors)
    //     }
    // }

}

export default EventService