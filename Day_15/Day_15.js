const express = require('express');
const bodyParser = require('body-parser');
const app = express();
 
// Logging middleware for Express
function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const headers = req.headers;
    const body = req.body;
 
    console.log(`[${timestamp}] ${method} ${url}`);
    console.log('Headers:', headers);
    console.log('Body:', body);
 
    next();
}
 
// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
 
// Use the logging middleware for all routes
app.use(loggingMiddleware);
 
// Example route
app.post('/example', (req, res) => {
    res.json({ message: 'Request received successfully.' });
});

// Route for the root path
app.get('/', (req, res) => {
    res.send('Hello, Express!')
});
 
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});