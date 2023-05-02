import User from "../../models/users/User"
import checkPassword from '../../utils/checkPassword'

class UserService {

    async getById(id: number): Promise<User> {
        const user = await User.findByPk(id)
        if (user == null) {
            throw new Error("Invalid identifier")
        }
        return user.toJSON()
    }

    async create(userInfo: any): Promise<User> {
        const user = await User.create(userInfo)
        return user.toJSON()
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await User.findOne({ where: { email } })
        
        if (user) return { user: user.toJSON(), checkPassword: checkPassword(user, password) }

        if (user == null) {
            throw new Error("Invalid identifier")
        }
    }
}

export default UserService