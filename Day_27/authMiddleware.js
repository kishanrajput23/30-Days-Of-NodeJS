const jwt = require('jsonwebtoken');

// Sample users with roles
const users = [
  { id: 1, username: 'admin', role: 'admin' },
  { id: 2, username: 'user', role: 'user' },
];

// Secret key for signing and verifying JWTs (replace 'your-secret-key' with a strong secret)
const secretKey = 'your-secret-key';

// Middleware function for authentication and authorization
function authenticateAndAuthorize(req, res, next) {
  // Extract the token from the request headers
  const token = req.headers.authorization;

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);

    // Check if the decoded user exists in the users array
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    // Attach the user object to the request for further use in routes
    req.user = user;

    // Check if the user has the required role to access the route
    const requiredRole = req.routeSettings && req.routeSettings.requiredRole;

    if (requiredRole && user.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
    }

    // If everything is valid, move to the next middleware or route
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

module.exports = authenticateAndAuthorize;
