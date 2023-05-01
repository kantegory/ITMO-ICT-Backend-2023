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
    async getAll() : Promise<User[]> {
        const users = await User.findAll()

        return users
    }

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

    async deleteById(id: number): Promise<boolean> {
        const deletedRows = await User.destroy({ where: { id } })
        return deletedRows > 0;
    }

    async updateById(id: number, userData: Partial<UserCreateRequest>): Promise<boolean> {
        const affectedCount = await User.update(userData, { where: { id } })
        return affectedCount[0] > 0;
    }
}

export default UserRepository