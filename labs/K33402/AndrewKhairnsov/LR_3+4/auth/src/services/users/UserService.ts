import User from '../../models/users/User'
import UserError from '../../errors/users/UserError'
import bcrypt from "bcrypt";

class UserService {
    async getById(id: number): Promise<User> {
        const user = await User.findByPk(id);

        if (user) return user.toJSON();

        throw new UserError(`User not fount UwU`);
    }

    async create(userData: Partial<User>): Promise<User> {
        try {
            const user = await User.create(userData);

            return user.toJSON();
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);

            throw new UserError(errors);
        }
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await User.findOne({where: {email}});

        if (user) return {user: user.toJSON(), checkPassword: bcrypt.compareSync(password, user.password)};

        throw new UserError('Incorrect login or password! AoAoAo');
    }

    async getAllUsers() {
        const users = await User.findAll();

        if (users) return users;

        throw new UserError('Users are not found :/');
    }
}

export default UserService;
