import User from "../models/users/User"
import checkPassword from '../utils/checkPassword'


class UserService {
    async getByID(id: number): Promise<User|Error> {
        const user = await User.findByPk(id)
        if (user) {
            return user.toJSON()
        }
        throw new Error(`User with id ${id} not found`)
    }

    async create(userData: any): Promise<User> {
        const user = await User.create(userData)
        if (user) {
            return user.toJSON()
        }
        throw new Error(`Error`)
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await User.findOne({ where: { email: email }})
        if (user) {
            return { user: user.toJSON(), checkPassword: checkPassword(user, password) }
        }
        throw new Error("Login or password is incorrect!")
    }

    async deleteById(id: number) {
        const user = await User.findByPk(id)
        if (user) {
            return await User.destroy({ where: { id } })
        }
        throw new Error("Invalid identifier")
    }
}

export default UserService