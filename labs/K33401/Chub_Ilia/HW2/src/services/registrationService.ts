import RegistrationModel from '../models/registrationModel'
import RegistrationError from '../errors/registrationError'
import EventService from "./eventService"
import UserService from "./userService"

const eventService = new EventService()
const userService = new UserService()

class RegistrationService {
    async findById(id: number): Promise<RegistrationModel> {
        const registration: RegistrationModel | null = await RegistrationModel.findByPk(id)
        if (registration) return registration.toJSON()
        throw new RegistrationError('Not found!')
    }

    async getById(id: number): Promise<RegistrationModel> {
        const registration = await this.findById(id)
        // @ts-ignore
        registration['user'] = await userService.getById(registration['userId'])
        // @ts-ignore
        registration['event'] = await eventService.findById(registration['eventId'])
        // @ts-ignore
        delete registration.userId
        // @ts-ignore
        delete registration.eventId
        return registration
    }

    async getAll(): Promise<RegistrationModel[]> {
        return await RegistrationModel.findAll()
    }

    async update(id: number, registrationData: object): Promise<RegistrationModel | RegistrationError> {
        try {
            await this.findById(id)
            await RegistrationModel.update(registrationData, {where: {id}})
            return await this.findById(id)
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new RegistrationError(errors)
        }
    }

    async delete(id: number): Promise<RegistrationModel> {
        try {
            const deletedRegistration: RegistrationModel = await this.findById(id)
            await RegistrationModel.destroy({where: {id}})
            return deletedRegistration
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new RegistrationError(errors)
        }
    }

    async create(registrationData: any): Promise<RegistrationModel | RegistrationError> {
        await userService.getById(registrationData['userId'])
        await eventService.getById(registrationData['eventId'])
        try {
            const registration = await RegistrationModel.create(registrationData)
            return registration.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new RegistrationError(errors)
        }
    }
}

export default RegistrationService
