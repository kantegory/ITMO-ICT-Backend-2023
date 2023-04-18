import UserRepository from "../repositories/User"
import RandomEntityService from "./RandomEntity";

const userRepository = new UserRepository
const randomEntityService = new RandomEntityService

class UserService {
    async getAll() {
        return userRepository.readAll()
    }

    async getById(id: number) {
        return userRepository.readById(id)
    }

    async getByUsername(username: string) {
        return userRepository.readByUsername(username)
    }

    async addRandomEntity(username: string, randomEntityId: number) {
        let randomEntity = await randomEntityService.getById(randomEntityId)
        return userRepository.updateUserRandomEntities(username, randomEntity, true)
    }

    async deleteRandomEntity(username: string, randomEntityId: number) {
        let randomEntity = await randomEntityService.getById(randomEntityId)
        return await userRepository.updateUserRandomEntities(username, randomEntity, false)
    }
}

export default UserService