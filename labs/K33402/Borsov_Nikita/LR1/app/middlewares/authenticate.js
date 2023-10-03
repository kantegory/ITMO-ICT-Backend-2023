const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};