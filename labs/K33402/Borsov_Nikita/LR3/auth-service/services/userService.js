const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const envVar = process.env

class UserService {
    async register(email, password) {
        try {
            return await User.create({email, password});
        } catch(error) {
            console.log(error)
        }

    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user || !user.validPassword(password)) {
            throw new Error('Invalid login credentials');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, envVar.JWT_SECRET);
        return { user, token };
    }

    async getUserById(id) {
        return await User.findByPk(id);
    }

    async updateUser(id, data) {
        await User.update(data, {
            where: { id },
        });

        return await User.findByPk(id);
    }
}

module.exports = new UserService();
