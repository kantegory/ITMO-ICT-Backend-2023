import { userInfo } from "os"
import UserError from "../errors/users/user"
import User from "../models/user"


class UserService {
    async getById(id: string){
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('Not found!')

    }
    
    async getByEmail(email: string){
        try {
            const user = await User.findOne({where: {email}})
            return user
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }

    async create(user: any): Promise<User|Error>{
        try {
            const userData = await User.create(user)
            return userData
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }

    async listUsers(){
        const users = await User.findAll()

        if (users) return users

        throw new UserError('Not found!')
    }

    async updateUser(id:string, data: any) {
        try {
            const user = await User.findByPk(id)
            if (user) {
                user.update(data)
            }
            return user
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }
    
    async deleteUser(id:string) {
        try {
            await User.destroy({where: {id:id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }
    async checkPassword(email: string, password: string): Promise<any> {
        try {
            const data = await User.findOne({where: { 
                "email": email, 
                "password" : password 
            }})
            if (data) {
                return { user: data, passwordMatch: true } 
            }
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }
}

export default UserService