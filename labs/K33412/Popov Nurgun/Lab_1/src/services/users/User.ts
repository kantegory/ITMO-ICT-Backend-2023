import User from "../../models/users/User"
import checkPassword from '../../utils/checkPassword'

class UserService {
    async createUser(userData: any): Promise<User> {
        const user = await User.create(userData)
        return user.toJSON()
    }

    async getUser(id: number): Promise<User|Error> {
        const user = await User.findByPk(id)

        if (user == null) {
            throw new Error("Invalid identifier")
        }
        return user.toJSON()
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const user = await User.findOne({ where: { email } })
        if (user) return { user: user.toJSON(), checkPassword: checkPassword(user, password) }

        if (user == null) {
            throw new Error("Invalid identifier")
        }
    }
}

export default UserService