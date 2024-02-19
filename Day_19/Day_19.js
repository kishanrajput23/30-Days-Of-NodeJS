const mongoose = require('mongoose');

// Define the Mongoose schema for the User with email validation
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                // Custom validator function for email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format'
        }
    }
});

// Create the Mongoose model for the User schema and specify the collection name 'users'
const User = mongoose.model('User', userSchema, 'users');

// Connect to MongoDB with the correct database name
mongoose.connect('mongodb://localhost:27017/mydb')
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the Express server or perform other actions after successful MongoDB connection
        // (Not required for this specific problem)
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Function to add a new user to the MongoDB database with validation
function addUserWithValidation(user) {
    // Create a new user instance using the Mongoose model
    const newUser = new User(user);

    // Use the save method to save the user to the 'users' collection in the 'mydb' database
    newUser.save()
        .then(() => {
            // Log a success message if the user is saved successfully
            console.log('User successfully added to the "users" collection in the "mydb" database!');
        })
        .catch((error) => {
            // Handle validation errors and other errors during the save operation
            console.error('Error adding user to the "users" collection:', error.message);
        });
}

// Example usage:
addUserWithValidation({ username: 'kishan', email: 'kishan@example.com' });
addUserWithValidation({ username: 'kanhaiya', email: 'invalid-email' });
