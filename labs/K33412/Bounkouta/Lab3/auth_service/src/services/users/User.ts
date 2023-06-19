import User from '../../models/users/User'
import APIError from '../../errors/APIError'
import checkPassword from '../../utils/checkPassword'


class UserService {
    async getById(id: number): Promise<User> {
        const user = await User.findByPk(id)
        if (user) {
            return user.toJSON()
        }
        throw new APIError('User not found')
    }

    async create(userData: any): Promise<User> {
        try {
            const user = await User.create(userData)
            await user.reload()
            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new APIError(errors)
        }
    }

    async update(id: number, userData: any): Promise<User> {
        let user = await User.findByPk(id)
        if (user) {
            try {
                user = await user.update(userData)
                await user.reload()
                return user.toJSON()
            } catch (e: any) {
                const errors = e.errors.map((error: any) => error.message)
                throw new APIError(errors)
            }
        }
        throw new APIError('User not found')
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await User.scope('withPassword').findOne({where: {email}})
        if (user) {
            return {user: user.toJSON(), checkPassword: checkPassword(user, password)}
        }
        throw new APIError('Incorrect credentials')
    }
}

export default UserService
