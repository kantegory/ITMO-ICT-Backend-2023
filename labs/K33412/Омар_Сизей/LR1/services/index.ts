import { Person } from '../models/Person'
import { sequelize } from '../config/config'

export class MainService {

    private repo = sequelize.getRepository(Person)
    
    add(name_par: string, surname_par: string, gmail_par: number) {
        this.repo.create({ name: name_par, surname: surname_par, gmail: gmail_par })
    }

    get() {
        const data = this.repo.findAll()
        return data
    }
}