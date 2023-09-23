import UserModel from '../models/userModel'
import UserError from '../errors/userError'
import HashPasswordUtils from '../utils/hashPasswordUtils'

class UserService {
    async getById(id: number): Promise<UserModel> {
        const user = await UserModel.findByPk(id)
        if (user) return user.toJSON()
        throw new UserError('Not found!')
    }

    async create(userData: object): Promise<UserModel | UserError> {
        try {
            // @ts-ignore
            const user = await UserModel.create(userData)
            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }

    async checkPassword(username: string, password: string): Promise<any> {
        const user = await UserModel.findOne({where: {username}})
        if (user) return {user: user.toJSON(), checkPassword: HashPasswordUtils.checkPassword(password, user.password)}
        throw new UserError('Incorrect login/password!')
    }
}

export default UserService
