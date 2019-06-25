const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, null);
        req.userData = token;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed!' })
    }
};