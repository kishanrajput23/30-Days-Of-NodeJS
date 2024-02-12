const express = require('express');
const app = express();
 
/**
* Express route to handle requests with a positive integer parameter
* @param {Object} req - Express request object
* @param {Object} res - Express response object
*/
function positiveIntegerHandler(req, res) {
    const number = parseInt(req.query.number);
 
    if (Number.isInteger(number) && number > 0) {
        res.send('Success! The number is a positive integer.');
    } else {
        throw new Error('Invalid or non-positive integer provided.');
    }
}
 
/**
* Express error handling middleware for specific error
* @param {Error} err - The thrown error
* @param {Object} req - Express request object
* @param {Object} res - Express response object
* @param {Function} next - Express next function
*/
function errorHandlerMiddleware(err, req, res, next) {
    if (err.message === 'Invalid or non-positive integer provided.') {
        res.status(400).send('Error: Please provide a valid positive integer.');
    } else {
        next(err); // Pass other errors to the default error handler
    }
}
 
// Use the error handling middleware for all routes
app.use(errorHandlerMiddleware);
 
// Define the "/positive" route
app.get('/positive', positiveIntegerHandler);
 
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});