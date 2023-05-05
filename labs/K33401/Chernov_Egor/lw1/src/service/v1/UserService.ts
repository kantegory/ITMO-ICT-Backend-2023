import * as dotenv from "dotenv"
import {Repository} from "typeorm"
import {AppDataSource} from "../../data-source"
import {User} from "../../entity/User"
import checkPassword from "../../util/v1/checkPassword"

class UserService {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async getAll() {
        return await this.userRepository.find()
    }

    async getUser(userId: string) {
        return await this.userRepository.findOne({
            where: {
                id: userId
            }})
    }

    async create(userData: object) {
        const user = await this.userRepository.create(userData)
        return await this.userRepository.save(user)
    }

    async login(email, password) {
        const user = await this.userRepository.findOne({
            where:{
                email: email
            }})
        const isMatch = checkPassword(password, user.password)
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