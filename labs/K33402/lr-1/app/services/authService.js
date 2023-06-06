const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models').User;
const env1 = process.env;

exports.register = async ({ email, password }) => {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: user.id }, env1.JWT_SECRET, { expiresIn: '24h' });
    console.log(token);

    return {
        user: {
            id: user.id,
            email: user.email
        },
        token
    };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, env1.JWT_SECRET, { expiresIn: '24h' });

    return {
        user: {
            id: user.id,
            email: user.email
        },
        token
    };
};