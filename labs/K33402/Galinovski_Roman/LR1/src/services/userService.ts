import User from '../models/User'
import { sequelize } from '../config/config'

export default class DefaultService {

    private repo = sequelize.getRepository(User)
    
    add(name: string, password: string, email: string) {
        this.repo.create({ name: name, password: password, email: email })
    }

    get() {
        return this.repo.findAll()
    }
}