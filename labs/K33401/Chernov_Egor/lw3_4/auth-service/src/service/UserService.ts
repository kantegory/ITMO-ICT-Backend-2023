import {Repository} from "typeorm"
import {AppDataSource} from "../data-source"
import {User} from "../entity/User"
import checkPassword from "../util/checkPassword"


class UserService {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async getAll() {
        return await this.userRepository.find()
    }

    async get(userId: string) {
        return await this.userRepository.findOneBy({
            id: userId
        })
    }

    async create(userData: object) {
        const user = await this.userRepository.create(userData)
        return await this.userRepository.save(user)
    }

    async login(email, password) {
        const user = await this.userRepository.findOneBy({
            email: email
        })
        const isMatch = checkPassword(password, user!.password)
        if (isMatch) {
            return user
        }
        throw new Error("Password isn't correct")
    }

    async update(userId: string, userData: object) {
        return await this.userRepository.update({id: userId}, userData)
    }

    async delete(userId) {
        return await this.userRepository.delete(userId)
    }
}

export default UserService