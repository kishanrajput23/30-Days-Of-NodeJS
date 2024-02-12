const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Rate-limiting middleware for Express
const rateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
});

app.use(rateLimitMiddleware);

// Example route
app.get('/limited-route', (req, res) => {
    res.send('This route is rate-limited.');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
