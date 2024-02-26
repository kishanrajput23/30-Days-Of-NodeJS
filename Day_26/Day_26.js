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

// Function to execute an aggregation pipeline for product statistics
function getProductStatistics() {
  return Product.aggregate([
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        averagePrice: { $avg: '$price' },
        highestQuantity: { $max: '$quantity' },
      },
    },
  ]);
}

// Call the function to execute the aggregation pipeline
getProductStatistics().then((result) => {
  console.log('Product Statistics:', result);
  
  // Close the MongoDB connection after executing the pipeline
  mongoose.connection.close();
}).catch((err) => {
  console.error('Error executing pipeline:', err);

  // Close the MongoDB connection in case of an error
  mongoose.connection.close();
});
