import User from '../../database/models/users/User'
import checkPassword from '../../utils/checkPassword'

class UserService {

    async getById(id: number): Promise<User> {
        const user = await User.findOne({ where: { 'id': id } })
        if (user) return user
        throw new Error(`User with id ${id} not found`)
    }

    async create(userData: Partial<User>): Promise<User> {
        try {
            const user = await User.create(userData)
            return user.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw console.log(errors)
        }
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await User.findOne({ where: { 'email' : email } })

        if (user)
            return { user: user.toJSON(),
                     checkPassword: checkPassword(user.dataValues, password) }

        throw console.log('Incorrect nickname or password')
    }
}

export default UserService
