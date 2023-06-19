import UserRepository from '../repositories/User'
import RandomEntityService from './RandomEntity'

const userRepository = new UserRepository()
const randomEntityService = new RandomEntityService()

class UserService {
    async getAll() {
        return userRepository.readAll()
    }

    async getByUsername(username: string) {
        return userRepository.readOneByUsername(username)
    }

    async createNewUser(username: string, password: string) {
        return userRepository.createUser(username, password)
    }

    async addRandomEntity(username: string, randomEntityId: number) {
        const randomEntity = await randomEntityService.getById(randomEntityId)
        return userRepository.updateUserRandomEntities(
            username,
            randomEntity,
            true
        )
    }

    async deleteRandomEntity(username: string, randomEntityId: number) {
        const randomEntity = await randomEntityService.getById(randomEntityId)
        return await userRepository.updateUserRandomEntities(
            username,
            randomEntity,
            false
        )
    }
}

export default UserService
