import {AppDataSource} from '../database/datasource'
import {User} from '../models/user.model'

const userRepository = AppDataSource.getRepository(User)

class UserService {
    async getAll() {
        return await userRepository.find({
            select: ['id', 'username'],
        })
    }

    async getByUsername(username: string) {
        return await userRepository.findOneOrFail({
            select: ['id', 'username', 'password', 'tokenVersion'],
            where: {username: username},
        })
    }

    async create(username: string, password: string) {
        const user = new User()
        user.username = username
        user.password = password
        user.tokenVersion = 1
        user.hashPassword()
        return await userRepository.save(user)
    }

    async updateUserTokenVersion(username: string) {
        const user = await this.getByUsername(username)
        user.tokenVersion += 1
        await userRepository.save(user)
        return user.tokenVersion
    }
}

export default UserService
