import User from '../../models/users/User'
import UserError from '../../errors/users/User'
import checkPassword from '../../utils/checkPassword'

class UserService {
    async getById(id: number) : Promise<User> {
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('Not found!')
    }

    async create(userData: any) : Promise<User|UserError> {
        try {
            const user = await User.create(userData)

            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const user = await User.findOne({ where: { email } })

        if (user) return { user: user.toJSON(), checkPassword: checkPassword(user, password) }

        throw new UserError('Incorrect login/password!')
    }

    async getAll() {
        const users = await User.findAll()

        if (users) return users

        throw new UserError('Users not found')
    }

    async getByEmail(email: string) {
        const user = await User.findOne({where: {email}})

        if (user) return user.toJSON()

        throw new UserError('User with this email not found')
    }

      async changeUserInfo(id: number, newUserInfo: string) : Promise<User>  {
        const user = await User.findByPk(id);

        if (!user) {
          throw new UserError('User not found');
        }

        Object.assign(user, newUserInfo);

        return await user.save()
      }

    async deleteUser(id: number): Promise<void> {
        const user: User | null = await User.findByPk(id)
        if (user == null) {
            throw new Error("No such user")
        }

        return await user.destroy()
    }
}

export default UserService
