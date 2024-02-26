// Import necessary modules (make sure you have mongoose imported)
const mongoose = require('mongoose');
 
// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
 
// Define the Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});
 
// Create the Product model
const Product = mongoose.model('Product', productSchema);
 
// Function to create an index on the "name" field
function createProductNameIndex() {
  // Use the createIndex method on the "name" field of the Product collection
  Product.collection.createIndex({ name: 1 }, (err, result) => {
    if (err) {
      console.error('Error creating index:', err);
    } else {
      console.log('Index created successfully:', result);
    }
 
    // Close the MongoDB connection after creating the index
    mongoose.connection.close();
  });
}
 
// Call the function to create the index
createProductNameIndex();