const express = require('express');
const app = express();

// In-memory cache
const cache = {};

/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
    const cacheKey = req.url;

    // Check if the response is cached
    if (cache[cacheKey] && cache[cacheKey].expirationTime > Date.now()) {
        console.log('Cached response found');
        return res.send(cache[cacheKey].data);
    }

    // If not cached or cache expired, proceed with the request
    console.log('Cache miss, processing the request');
    const originalSend = res.send;

    // Override the res.send function to cache the response before sending it
    res.send = function (body) {
        cache[cacheKey] = {
            data: body,
            expirationTime: Date.now() + 60 * 1000, // Cache expiration time: 1 minute
        };
        originalSend.call(this, body);
    };

    next();
}

// Use caching middleware for all routes
app.use(cachingMiddleware);

// Example route
app.get('/example', (req, res) => {
    // Simulate a time-consuming operation
    setTimeout(() => {
        res.send('This is the response.');
    }, 2000); // Simulate a 2-second delay
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
