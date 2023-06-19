const userService = require('../services/userService');

module.exports = {
    async register(req, res) {
        const { email, password } = req.body;
        const user = await userService.register(email, password);
        res.json(user);
    },

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const { user, token } = await userService.login(email, password);
            res.json({ user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getUser(req, res) {
        const user = await userService.getUserById(req.user.id);
        return res.json(user);
    },

    async updateUser(req, res) {
        const user = await userService.updateUser(req.body.id, req.body);
        console.log("User is updated")
        return res.json(user);
    }
};
