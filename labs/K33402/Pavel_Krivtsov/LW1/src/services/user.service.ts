import { AppDataSource } from '../database/datasource'
import { User } from '../models/user.model'
import TemplateService from './template.service'

const userRepository = AppDataSource.getRepository(User)
const templateService = new TemplateService()

class UserService {
    async getAll() {
        return await userRepository.find({
            select: ['id', 'username'],
        })
    }

    async getByUsername(username: string) {
        return await userRepository.findOneOrFail({
            select: ['id', 'username', 'password', 'tokenVersion'],
            relations: {
                templateModels: true,
            },
            where: { username: username },
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

    async addOrDeleteTemplate(
        username: string,
        templateId: number,
        add: boolean
    ) {
        const template = await templateService.getById(templateId)
        const user = await this.getByUsername(username)

        if (add) {
            await userRepository
                .createQueryBuilder()
                .relation(User, 'templateModels')
                .of(user)
                .add(template)
        } else {
            await userRepository
                .createQueryBuilder()
                .relation(User, 'templateModels')
                .of(user)
                .remove(template)
        }
        return await this.getByUsername(username)
    }

    async updateUserTokenVersion(username: string) {
        const user = await this.getByUsername(username)
        user.tokenVersion += 1
        await userRepository.save(user)
        return user.tokenVersion
    }
}

export default UserService
