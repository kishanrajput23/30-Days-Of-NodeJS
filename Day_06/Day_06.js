/**
* Handles GET requests to "/greet" endpoint
* @param {Object} req - Express request object
* @param {Object} res - Express response object
*/
function greetHandler(req, res) {
    const name = req.query.name || 'Guest';
        const greeting = `Hello, ${name}!`;
        res.send(greeting);
    }
     
    // Example Usage in Express
    const express = require('express');
    const app = express();
     
    // Define the "/greet" route
    app.get('/greet', greetHandler);
     
    // Start the server
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });