import RandomEntityRepository from '../repositories/RandomEntity'

const randomEntityRepository = new RandomEntityRepository()

class RandomEntityService {
    async getById(id: number) {
        return randomEntityRepository.readById(id)
    }

    async getAll() {
        return randomEntityRepository.readAll()
    }

    async create(randomProperty: string) {
        return randomEntityRepository.create(randomProperty)
    }

    async update(id: number, randomProperty: string) {
        return randomEntityRepository.update(id, randomProperty)
    }

    async delete(id: number) {
        return randomEntityRepository.delete(id)
    }
}

export default RandomEntityService
