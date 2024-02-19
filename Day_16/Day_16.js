const express = require('express');
const mongoose = require('mongoose');
const app = express();
 
/**
* Establishes a connection to MongoDB using Mongoose
*/
function connectToMongoDB() {
    // Replace 'mongodb://localhost/mydatabase' with your MongoDB connection string
    const mongoDBURI = 'mongodb://localhost:27017/mydb';
 
    mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });
 
    const db = mongoose.connection;
 
    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });
 
    db.once('open', () => {
        console.log('Successfully connected to MongoDB!');
    });
}
 
// Call the function to establish the MongoDB connection
connectToMongoDB();