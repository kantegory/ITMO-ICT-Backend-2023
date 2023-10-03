const userService = require('../services/userService');

module.exports = {
    async createUser(req, res) {
        const { firstName, lastName, email } = req.body;
        const user = await userService.createUser(firstName, lastName, email);
        res.json(user);
    },

    async getUser(req, res) {
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    },

    async updateUser(req, res) {
        const user = await userService.updateUser(req.body.id, req.body);
        return res.json(user);
    }
};
