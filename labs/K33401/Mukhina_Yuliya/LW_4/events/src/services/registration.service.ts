import Registration from '../models/registration.model'
import Event from "../models/event.model"

class RegistrationService {
    async getById(id: number): Promise<Registration> {
        const registration: Registration | null = await Registration.findByPk(id)
        if (registration) return registration.toJSON()
        throw new Error('Not found!')
    }

    async getAllByEvent(eventId: number): Promise<number> {
        return await Registration.count({
            where: {eventId: eventId},
        })
    }

    async getAllByUser(userId: number): Promise<Registration[]> {
        return await Registration.findAll({
            where: {userId: userId},
            attributes: ['eventId']
        })
    }

    async create(eventId: number, userId: number) {
        try {
            await Registration.create({eventId: eventId, userId: userId})
        } catch (e: any) {
            throw new Error(e.message)
        }
    }

    async delete(eventId: number, userId: number) {
        try {
            await Registration.destroy({where: {eventId: eventId, userId: userId}})
        } catch (e: any) {
            throw new Error(e.message)
        }
    }
}

export default RegistrationService