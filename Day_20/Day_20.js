const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Define the Mongoose schema for the User
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

// Create the Mongoose model for the User schema and specify the collection name 'users'
const User = mongoose.model('User', userSchema, 'users');

// Connect to MongoDB with the correct database name
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
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

// Express route to calculate the average age of all users in MongoDB
app.get('/average-age', averageAgeOfUsers);

// Route handler function to calculate the average age
function averageAgeOfUsers(req, res) {
    // Use MongoDB aggregation to calculate the average age
    User.aggregate([
        {
            $group: {
                _id: null,
                averageAge: { $avg: '$age' },
            },
        },
    ])
    .then((result) => {
        // Extract the average age from the aggregation result
        const averageAge = result[0].averageAge;
        // Send a JSON response with the calculated average age
        res.json({ averageAge });
    })
    .catch((error) => {
        // Handle errors during the aggregation
        console.error('Error calculating average age:', error);
        // Send an appropriate error response
        res.status(500).json({ error: 'Internal Server Error' });
    });
}
