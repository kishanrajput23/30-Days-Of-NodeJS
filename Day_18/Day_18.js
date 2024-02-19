const express = require('express');
const mongoose = require('mongoose');
 
const app = express();
 
// Define the Mongoose schema for the User
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true }
});
 
// Create the Mongoose model for the User schema
const User = mongoose.model('User', userSchema, 'users');
 
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb')
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the Express server after successful MongoDB connection
        app.listen(3000, () => {
            console.log('Express server is listening on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
 
// Express route to get all users from MongoDB
app.get('/users', getAllUsers);
 
// Route handler function to get all users
function getAllUsers(req, res) {
    // Use the User.find() method to retrieve all users from the database
    User.find()
        .then((users) => {
            // Send a JSON response containing the array of user objects
            res.json(users);
        })
        .catch((error) => {
            // Handle any errors that occur during the query
            console.error('Error retrieving users:', error);
            // Send an appropriate error response
            res.status(500).json({ error: 'Internal Server Error' });
        });
}