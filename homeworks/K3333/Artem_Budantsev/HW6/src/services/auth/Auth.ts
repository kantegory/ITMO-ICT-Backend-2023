import Admin from '../../models/admin/Admin'
import checkPassword from '../../utils/checkPassword'

class AuthService {

    async get(id: number): Promise<Admin> {
        const user = await Admin.findByPk(id);

        if (user) return user;

        throw new Error('User is not found by id');
    }

    async getByEmail(email: string): Promise<Admin> {
        const user = await Admin.findOne({ where: { email } });

        if (user) return user;

        throw new Error('User is not found by email');
    }

    async create(userData: { email: string, password: string }): Promise<Admin> {
        try {
            const user = await Admin.create(userData)
            
            return user.toJSON()
        } catch (e: any) {
            throw new Error(e)
        }
    }


    async checkPassword(email: string, password: string): Promise<any> {
        const user = await Admin.findOne({where: {email}})
        
        if (user) return {admin: user.toJSON(), checkPassword: checkPassword(user, password) }

        throw new Error('Incorrect login/password')
    }
}

export default AuthService