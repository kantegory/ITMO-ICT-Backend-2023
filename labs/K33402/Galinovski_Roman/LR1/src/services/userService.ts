import User from '../models/User'
import { sequelize } from '../config/config'

export default class DefaultService {

    private repo = sequelize.getRepository(User)
    
    add(nickname: string, password: string, email: string) {
        this.repo.create({ nickname: nickname, password: password, email: email })
    }

    get() {
        return this.repo.findAll()
    }
}