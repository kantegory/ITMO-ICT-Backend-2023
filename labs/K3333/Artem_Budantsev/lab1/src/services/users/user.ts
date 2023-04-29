import User from '../../models/users/User'

class UserService {
    async getById(id: number) {
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

    }

    async get() {
        const users = await User.findAll();

        if (users) return users 
    }

    async create(userData: any) {
        try {
            const user = await User.create(userData)

            return user.toJSON()
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }

    async update(id: number, userData: any) {
        try {
            const user = await User.findByPk(id)

            if (user) {
                console.log(userData)

                const update_user = await user.update(userData)   

                return update_user.toJSON()
            }
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
        
    }

    async delete(id: number) {
        try {
            const user = await User.findByPk(id)

            if (user) {
                const deleted_user = await user.destroy({where: {id: id}})

                return deleted_user
            }
        }
        catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }    
    }
}

export default UserService