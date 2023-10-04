import User from "../../models/users/User"
import checkPassword from '../../utils/checkPassword'

class UserService {
    async getById(id: number): Promise<User|Error> {
        const user = await User.findByPk(id)
        if (user == null) {
            throw new Error("Invalid identifier")
        }
        return user.toJSON()
    }

    async create(userData: any) : Promise<User> {
        try {
            const user = await User.create(userData)
            return user.toJSON()

        } catch (error: any) {
            const errors = error.errors.map((error: any) => error.message)
            throw new Error(errors)
        }
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const user = await User.findOne({ where: { email } })
        if (user) return { user: user.toJSON(), checkPassword: checkPassword(user, password) }

        if (user == null) {
            throw new Error("Invalid identifier")
        }
    }

    async deleteById(id: number) {
        const user = await User.findByPk(id)
        if (user == null) {
            throw new Error("Invalid identifier")
        }
        return await User.destroy({ where: { id } })
    }
}

export default UserService