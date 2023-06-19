import Event from '../../models/event/Event'
import { sequelize } from '../../config/config'

export default class EventService {

    private repo = sequelize.getRepository(Event)
    
    add(event: any) {
        return this.repo.create(event)
    }

    getAll() {
        return this.repo.findAll()
    }

    getByFilter(city_param: string, type_param: string) {
        return this.repo.findAll( { where: { city: city_param, type: type_param } } )
    }
}

