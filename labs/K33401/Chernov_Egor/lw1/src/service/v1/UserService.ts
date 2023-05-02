import * as dotenv from "dotenv"
import {Repository} from "typeorm"
import {AppDataSource} from "../../data-source"
import {User} from "../../entity/User"
import checkPassword from "../../util/v1/checkPassword"
import checkTokens from "../../util/v1/checkTokens"

class UserService {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async getAll() {
        return await this.userRepository.find()
    }

    async getUser(accessToken: string) : Promise<User> {
        try {
            const status = checkTokens(accessToken)
            const userId = status.userId
            if (status.valid) {
                return await this.userRepository.findOne({
                    where: {
                        id: userId
                    }})
            }

        } catch (e: any) {
            console.log(e)
            throw "Error of getting user"
        }
    }

    async create(userData: object) {
        try {
            const user = await this.userRepository.create(userData)
            return await this.userRepository.save(user)
        } catch (e: any) {
            // const errors = e.errors.map((error: any) => error.message)
            // throw new UserError(errors)
            console.log(e)
            throw "Error of creating user"
        }
    }

    async login(email, password) {
        try {
            const user = await this.userRepository.findOne({
                where:{
                    email: email
                }})
            const isMatch = checkPassword(password, user.password)
            if (isMatch) {
                return user
            }
            throw "Error of user login"
        } catch (e: any) {
            console.log(e)
        }
    }

    async delete(user) {

    }
}

export default UserService