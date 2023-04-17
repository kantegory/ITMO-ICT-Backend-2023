import {AppDataSource} from "../database/data-source";
import {RandomEntity} from "../models/RandomEntity";

const randomEntityRepository = AppDataSource.getRepository(RandomEntity)

class RandomEntityService {
    async getById(id: number) {
        const randomEntity = await randomEntityRepository.findOneByOrFail({
            id: id
        })

        return randomEntity
    }
}

export default RandomEntityService