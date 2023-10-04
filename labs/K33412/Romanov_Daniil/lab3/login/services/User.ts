import User from "../models/User";
import APIError from "../errors/APIError";
import checkPassword from '../utils/checkPassword'

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
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new APIError(errors)
        }
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await User.findOne({ where: { email } })

        if (user) {
            return { user: user.toJSON(), checkPassword: checkPassword(user, password) }
        }

        throw new Error('Incorrect login or password')
    }
}

export default UserService