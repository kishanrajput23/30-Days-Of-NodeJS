const mongoose = require('mongoose');
 
// Define the Mongoose schema for the Product entity
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
 
// Create the Mongoose model for the Product schema and use the "testing" collection
const Product = mongoose.model('Product', productSchema, 'testing');
 
/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 */
async function createProduct(product) {
  try {
    // Create a new Product instance
    const newProduct = new Product(product);
    // Save the product to MongoDB
    await newProduct.save();
    console.log('Product created successfully:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
  }
}
 
/**
 * Retrieves all products from MongoDB
 * @returns {Array} - Array of product objects
 */
async function getAllProducts() {
  try {
    // Find all products in the "testing" collection
    const products = await Product.find();
    console.log('All products retrieved successfully:', products);
    return products;
  } catch (error) {
    console.error('Error retrieving products:', error.message);
    return [];
  }
}
 
/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 */
async function updateProduct(productId, updatedProduct) {
  try {
    // Find the product by ID and update it
    const result = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    console.log('Product updated successfully:', result);
  } catch (error) {
    console.error('Error updating product:', error.message);
  }
}
 
/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 */
async function deleteProduct(productId) {
  try {
    // Find the product by ID and delete it
    const result = await Product.findByIdAndDelete(productId);
    console.log('Product deleted successfully:', result);
  } catch (error) {
    console.error('Error deleting product:', error.message);
  }
}
 
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => {
    console.log('Connected to MongoDB');
 
    // Example usage:
    createProduct({ name: 'Books', price: 19.99, quantity: 50 });
    createProduct({ name: 'Pens', price: 5.25, quantity: 100 });
    createProduct({ name: 'Compass', price: 12.99, quantity: 150 });
    getAllProducts();
    updateProduct('65d752509bc3f3336a176685', { name: 'Eraser', price: 2.99, quantity: 40 });
    deleteProduct('65d752509bc3f3336a176686');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });