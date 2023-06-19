import User from '../models/User'
import { sequelize } from '../config/config'

export default class DefaultService {

    private repo = sequelize.getRepository(User)
    
    add(name: string, surname: string, email: string, address: string) {
        this.repo.create({ name: name, surname: surname, email: email, address: address })
    }

    get() {
        return this.repo.findAll()
    }
}

