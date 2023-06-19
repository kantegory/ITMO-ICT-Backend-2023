import { AppDataSource } from '../database/data-source'
import { RandomEntity } from '../models/RandomEntity'

const randomEntityRepository = AppDataSource.getRepository(RandomEntity)

class RandomEntityRepository {
    async readById(id: number) {
        return await randomEntityRepository.findOneByOrFail({
            id: id,
        })
    }

    async readAll() {
        return await randomEntityRepository.find()
    }

    async create(randomProperty: string) {
        const randomEntity = new RandomEntity()
        randomEntity.randomProperty = randomProperty
        return await randomEntityRepository.save(randomEntity)
    }

    async update(id: number, randomProperty: string) {
        const randomEntity = await this.readById(id)
        randomEntity.randomProperty = randomProperty
        return await randomEntityRepository.save(randomEntity)
    }

    async delete(id: number) {
        const randomEntity = await this.readById(id)
        return await randomEntityRepository.delete(randomEntity)
    }
}

export default RandomEntityRepository
