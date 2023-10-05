import User from "../../models/users/User";
import {UserError} from "../../helpers/errors/userError";
import checkPassword from "../../utils/checkPassword";

export class UserService {

    async createUser(userData: Partial<User>): Promise<User> {
        try {
            const user = await User.create(userData)

            return user.toJSON()
        } catch (error: any) {
            const errors = error.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }

    async getAllUsers() {
        const users = await User.findAll()
        if (users) return users

        return []
    }

    async getById(id: number): Promise<User> {
        const user = await User.findByPk(id)
        if (user) return user.toJSON()

        throw new UserError('User is not found')
    }

    async deleteUser(id: number) {
        try {
            const isDeleted = await User.destroy({where: {id: id}})
        } catch (e) {
            throw new UserError('Could not delete user')
        }
    }

    async getByUsername(username: string): Promise<User> {
        const user = await User.findOne({where: {username: username}})
        if (user) return user.toJSON()

        throw new UserError('User with such username is not found')
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await User.findOne({where: {email: email}})

        if (user) {
            return {
                user: user.toJSON(),
                checkPassword: checkPassword(user, password)
            }
        }
    }
}