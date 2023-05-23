import User from "../models/user"
import { passwordHash } from "../utils/passwordHash";
import { Op } from "sequelize";

class UserService {
    async create(userInfo: any) {
        userInfo.password = passwordHash(userInfo.password)
        try {
            const user = await User.create(userInfo)
            return user
        } catch (e: any) {
            throw new Error(e)
        }
        }

    async get(username: string, password: string): Promise<User> {
        const hash: string = passwordHash(password);
        const user: User | null = await User.findOne({
            where: {
                [Op.or]: {
                    username: username,
                    email: username,
                },
                password: hash
            }
        })

        if (user == null) {
            throw new Error("Credentials are invalid")
        }

        return user.toJSON()
    }

    async getById(id: number): Promise<User> {
        console.log(id)
        const user: User | null = await User.findByPk(id)
        console.log(user)
        if (user == null) {
            throw new Error("Id is invalid")
        }

        return user.toJSON()
    }

    async getAll(): Promise<User[]> {
        return User.findAll()
    }

    async update(id:number, userInfo: any) {
        try {
            const user = await User.findByPk(id)
            if (user) {
                user.update(userInfo)
            }
            return user
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id: number): Promise<void> {
        const user: User | null = await User.findByPk(id)
        if (user == null) {
            throw new Error("Id is invalid")
        }

        return user.destroy()
    }
}

export default UserService