import Organizer from '../models/organizer'
import OrganizerError from '../errors/organizer'

class OrganizerService {
    async getById(id: number) : Promise<Organizer> {
        const organizer = await Organizer.findByPk(id)

        if (organizer) return organizer.toJSON()

        throw new OrganizerError('Not found!')
    }

    async create(eventData: Partial<Organizer>): Promise<Organizer> {
        try {
            const organizer = await Organizer.create(eventData)

            return organizer.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new OrganizerError(errors)
        }
    }

    async getAll() {
        const organizers = await Organizer.findAll()

        if (organizers) return organizers

        throw new OrganizerError('Events are not found')
    }

    async delete(id: number) {
        const organizer: Organizer | null = await Organizer.findByPk(id)
        if (organizer == null) {
            throw new Error("Invalid identifier")
        }

        return await organizer.destroy()
    }
}

export default OrganizerService