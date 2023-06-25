import Registration from '../models/registration'
import RegistrationError from '../errors/registration'

class RegistrationService {
    async getById(id: number) : Promise<Registration> {
        const registration = await Registration.findByPk(id)

        if (registration) return registration.toJSON()

        throw new RegistrationError('Not found!')
    }

    async create(eventData: Partial<Registration>): Promise<Registration> {
        try {
            const registration = await Registration.create(eventData)

            return registration.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new RegistrationError(errors)
        }
    }

    async getAll() {
        const registrations = await Registration.findAll()

        if (registrations) return registrations

        throw new RegistrationError('Events are not found')
    }

    async delete(id: number) {
        const registration: Registration | null = await Registration.findByPk(id)
        if (registration == null) {
            throw new Error("Invalid identifier")
        }

        return await registration.destroy()
    }
}

export default RegistrationService