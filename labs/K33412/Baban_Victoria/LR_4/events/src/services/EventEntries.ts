import EventEntries from "../models/EventEntries"
import sequelize from '../providers/db'

const entriesRepository = sequelize.getRepository(EventEntries)

class EventEntryService {

    async create(entry: any) {
        try{
            const new_entry = await entriesRepository.create(entry)
            return new_entry.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw console.log(errors)
        }
    }

    async delete(id: number): Promise<void> {
        const entry = await entriesRepository.findByPk(id)
        if (entry) {
            await entry.destroy();
            return;
        }
        throw new Error(`Events entry with id ${id} not found`);
    }

    getForUser(user: number) {
        return entriesRepository.findAll({ where: { user_id: user } })
    }
}

export default EventEntryService
