const { User } = require('../models');

class UserService {
    async createUser(firstName, lastName, email) {
        return await User.create({firstName, lastName, email});
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
