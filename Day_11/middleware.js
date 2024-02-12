const jwtUtils = require('./jwtUtils');

/**
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next function
 */

function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: 'No token provides'});
    }

    try {
        const decoded = jwtUtils.verifyToken(token);
        req.user = decoded.user;
        next();
    }
    catch (error) {
        return res.status(401).json({message: 'Inavlid toeken'});
    }
}

module.exports = authenticationMiddleware;