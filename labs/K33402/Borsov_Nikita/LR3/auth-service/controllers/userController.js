const userService = require('../services/userService');
const axios = require('axios');

module.exports = {
    async register(req, res) {
        const { firstName, lastName, email, password } = req.body;
        try {
            const userInternal = { firstName, lastName, email };
            const user = await userService.register(email, password);
            const userDB = await axios.post('http://user-event-service:3003/api/user/create', userInternal);
            res.json(user);
        } catch(error) {
            res.status(400).json({ error: error.message })
        }
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
        return res.json(user);
    }
};
