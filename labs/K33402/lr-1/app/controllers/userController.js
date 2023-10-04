const userService = require('../services/userService');

exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.user);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};