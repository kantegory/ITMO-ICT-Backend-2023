import { AppDataSource } from '../database/data-source'
import { User } from '../models/User'

const userRepository = AppDataSource.getRepository(User)

class UserRepository {
    async readAll() {
        return await userRepository.find({
            select: ['id', 'username'],
        })
    }

    async readById(id: number) {
        return await userRepository.findOneOrFail({
            select: ['id', 'username'],
            relations: {
                randomEntities: true,
            },
            where: { id: id },
        })
    }

    async ReadTokenVersion(id: number) {
        return await userRepository.findOneOrFail({
            select: ['id', 'username', 'tokenVersion'],
            where: { id: id },
        })
    }

    async readByUsername(username: string) {
        return await userRepository.findOneOrFail({
            select: ['id', 'username'],
            relations: {
                randomEntities: true,
            },
            where: { username: username },
        })
    }

    async createUser() {}

    async updateUserRandomEntities(
        username: string,
        randomEntity: any,
        add: boolean
    ) {
        const user = await this.readByUsername(username)
        if (add) {
            await userRepository
                .createQueryBuilder()
                .relation(User, 'randomEntities')
                .of(user)
                .add(randomEntity)
        } else {
            await userRepository
                .createQueryBuilder()
                .relation(User, 'randomEntities')
                .of(user)
                .remove(randomEntity)
        }

        return await this.readByUsername(username)
    }
}

export default UserRepository
