import {Repository} from "typeorm"
import {AppDataSource} from "../../data-source";
import {User} from "../../entity/User"


class UserService {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async getAll() {
        return await this.userRepository.find()
    }

    async getByEmail(email: string) : Promise<User> {
        return await this.userRepository.findOne({where: {
            email: email,
        }})
    }

    async create(userData: object) {
        try {
            userData = await this.userRepository.create(userData)
            const newUser = await this.userRepository.save(userData)
            // todo: check if exist and after create portfolio
            return newUser
        } catch (e: any) {
            // const errors = e.errors.map((error: any) => error.message)
            console.log(e)

            // throw new UserError(errors)
            throw "Error1"
        }
    }

    // async checkPassword(email: string, password: string) : Promise<any> {
    //     const user = await User.findOne({ where: { email } })
    //
    //     if (user) return { user: user.toJSON(), checkPassword: checkPassword(user, password) }
    //
    //     throw new UserError('Incorrect login/password!')
    // }
}

export default UserService