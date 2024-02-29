// Import necessary modules
const express = require('express');
const app = express();
 
// Define your routes and other middleware
 
// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
 
  // Check the type of error
  if (err instanceof CustomError) {
    // Handle custom errors with specific responses
    return res.status(err.statusCode).json({ error: err.message });
  } else {
    // Handle other errors with a generic response
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
 
// Use the error handling middleware
app.use(errorHandler);
 
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 
// Define a custom error class for specific error types
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}
 
// Example route throwing an error
app.get('/example', (req, res, next) => {
  // Simulate an error
  const err = new CustomError('Custom Error Message', 400);
  next(err);
});
