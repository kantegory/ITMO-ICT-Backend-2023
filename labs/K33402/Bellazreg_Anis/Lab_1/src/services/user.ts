import UserError from "../errors/users/user"
import User from "../models/index"

// Define a UserService class that encapsulates the business logic for the User model
class UserService {
    // Define a method to retrieve a user by ID from the database
    async getById(id: string){
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('Not found!')

    }
    // Define a method to create a new user in the database
    async create(user: any): Promise<User|Error>{
        try {
            const userData = await User.create(user)
            return userData
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }

    }
    // Define a method to retrieve a list of all users from the database
    async listUsers(){
        const users = await User.findAll()

        if (users) return users

        throw new UserError('Not found!')
    }
    // Define a method to update an existing user in the database
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
    // Define a method to delete a user from the database
    async deleteUser(id:string) {
        try {
            await User.destroy({where: {id:id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

}

export default UserService