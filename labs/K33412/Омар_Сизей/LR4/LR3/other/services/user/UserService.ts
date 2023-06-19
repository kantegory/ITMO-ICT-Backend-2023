import User from '../../models/user/User'
import { sequelize } from '../../config/config'

export default class UserService {

    private repo = sequelize.getRepository(User)
    
    add(user: any) {
        return this.repo.create(user)
    }

    getAll() {
        return this.repo.findAll()
    }

    getByEmail(email_param: string) {
        return this.repo.findOne({ where: { email: email_param }})
    }

    getById(id_param: number) {
        return this.repo.findOne({ where: { id: id_param }})
    }   
}

