import User from '../../models/users/User'
import checkPassword from '../../utils/checkPassword'

class UserService {
    async getById(id: number) : Promise<User> {
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new Error('Not found!')
    }

    async create(userData: Partial<User>): Promise<User> {
        try {
            const user = await User.create(userData)

            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }

    async getAll() {
        const users = await User.findAll()

        if (users) return users

        throw new Error('Users are not found')
    }

    async getByUsername(username: string) {
        const user = await User.findOne({where: {username: username}})

        if (user) return user.toJSON()

        throw new Error('User with this username not found')
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const user = await User.findOne({ where: { email } })

        if (user) return { user: user.toJSON(), checkPassword: checkPassword(user, password) }

        throw new Error('Incorrect login/password!')
    }
}

export default UserService
