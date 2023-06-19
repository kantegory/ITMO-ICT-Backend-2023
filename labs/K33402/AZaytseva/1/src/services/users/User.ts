import User from '../../models/users/User'
import { checkPassword } from '../../utils/password'

interface UserCreateRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
}

class UserRepository {
    async getById(id: number) : Promise<User> {
        const user = await User.findByPk(id)

        if (user) {
          return user.toJSON()
        }

        throw new Error('Not found!')
    }

    async create(userData: Partial<UserCreateRequest>): Promise<User> {
      const user = await User.create(userData)
      return user.toJSON()
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await User.findOne({ where: { email } })

        if (user) {
          return {
            user: user.toJSON(),
            checkPassword: checkPassword(user, password)
          }
        }

        throw new Error('Incorrect login/password!')
    }
}

export default UserRepository