import User from '../../models/users/User'
import UserError from '../../errors/users/User'
import checkPassword from '../../utils/checkPassword'

class UserService {
    async getById(id: number) : Promise<User> {
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('Not found!')
    }

    async create(userData: Partial<User>): Promise<User> {
        try {
            const user = await User.create(userData)

            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async getAll() {
        const users = await User.findAll()

        if (users) return users

        throw new UserError('Users are not found')
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        console.log(email)
        const user = await User.findOne({ where: { email } })

        if (user) return { user: user.toJSON(), checkPassword: checkPassword(user, password) }

        throw new UserError('Incorrect login/password!')
    }
}

export default UserService