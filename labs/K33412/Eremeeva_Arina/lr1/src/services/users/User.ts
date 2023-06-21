import User from '../../models/users/User'
import sequelize from '../../providers/db'
import checkPassword from '../../utils/checkPassword'
const userRepository = sequelize.getRepository(User)

class UserService {

    async getById(id: number): Promise<User> {
        const user = await userRepository.findOne({ where: { 'id': id } })
        if (user) return user
        throw new Error(`User with id ${id} not found`)
    }

    async create(userData: Partial<User>): Promise<User> {
        try {
            const user = await userRepository.create(userData)
            return user.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw console.log(errors)
        }
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await userRepository.findOne({ where: { 'email' : email } })
        if (user) return { user: user.toJSON(), checkPassword: checkPassword(user.dataValues, password) }
        throw console.log('Incorrect login or password!')
    }
}

export default UserService