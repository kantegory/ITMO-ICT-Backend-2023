const User = require('../models').User;

exports.getProfile = async (user) => {
    const userProfile = await User.findOne({ where: { id: user.id }, attributes: ['id', 'email'] });

    if (!userProfile) {
        throw new Error('User not found');
    }

    return userProfile;
};