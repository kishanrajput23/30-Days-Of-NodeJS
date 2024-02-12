const jwt = require('jsonwebtoken');

const secretKey = '7vFs^9cB!2gS#P*E';

/**
 * Generate JWT token
 * @param {object} payload - Payload to be included in the token
 * @returns {string} JWT token
 */

function generateToken(payload) {
    return jwt.sign(payload, secretKey, {
        expiresIn: '1h'
    });
}

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded payload if token is valid
 * @throws {Error} If token is invalid
 */

function verifyToken(token) {
    return jwt.verify(token, secretKey);
}

module.exports = {generateToken, verifyToken};