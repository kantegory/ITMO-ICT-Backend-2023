import UserError from "../../errors/users/index";
import User from "../../models/user"

class UserService {

    async create(userData: any) {
        try {
            console.log(userData)
            const user = await User.create(userData)

            return user.toJSON()
        } catch (e: any) {
            console.log(e)
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async getAll() {
        const users = await User.findAll()

        if (users) return users

        throw new UserError('Users are not found')
    }

    async getById(id: number) {
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('User with this id not found')
    }

    async getByUsername(username: string) {
        const user = await User.findOne({
            where: {
                username: username
            }
        })

        if (user) return user.toJSON()

        throw new UserError('User with this username not found')
    }
}

export default UserService