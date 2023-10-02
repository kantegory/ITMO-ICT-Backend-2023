import User from "../../models/users/User";
import {UserError} from "../../helpers/errors/userError";
import checkPassword from "../../utils/checkPassword";
import Post from "../../models/posts/Post";
import sequelize from "../../providers/db";

const userRepository = sequelize.getRepository(User)

export class UserService {

    async createUser(userData: Partial<User>): Promise<User> {
        try {
            const user = await userRepository.create(userData)

            return user.toJSON()
        } catch (error: any) {
            throw new UserError(error)
        }
    }

    async getAllUsers(): Promise<User[]> {
        const users = await userRepository.findAll()
        if (users) return users

        return []
    }

    async getById(id: number): Promise<User> {
        const user = await userRepository.findByPk(id)
        if (user) return user.toJSON()

        throw new UserError('User not found')
    }

    async deleteUser(id: number) {
        try {
            const user = await userRepository.findByPk(id)
            if (user == null) {
                throw new Error("Invalid identifier")
            }

            return await user.destroy()
        } catch (error: any) {
            throw new UserError('Could not delete user' + error)
        }
    }

    async getByUsername(username: string): Promise<User> {
        const user = await userRepository.findOne({where: {username: username}})
        if (user) return user.toJSON()

        throw new UserError('User with such username not found')
    }

    async getPosts(userId: number): Promise<Post[]> {
        const user = await userRepository.findByPk(userId)

        if (user) {
            // @ts-ignore
            const posts = await user.getPosts()
            console.log(posts)
            if (posts) return posts
        }
        throw new UserError('User not found')
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await userRepository.findOne({where: {email: email}})

        if (user) {
            return {
                user: user.toJSON(),
                checkPassword: checkPassword(user, password)
            }
        }
        throw new UserError('User not found')
    }
}