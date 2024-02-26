const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 
const app = express();
const PORT = 3000;
 
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb');
 
// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});
 
// Create the Mongoose model for Product
const Product = mongoose.model('Product', productSchema);
 
app.use(bodyParser.json());
 
/**
* Express route to create a new product
* @param {Object} req - Express request object
* @param {Object} res - Express response object
*/
app.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
/**
* Express route to retrieve all products
* @param {Object} req - Express request object
* @param {Object} res - Express response object
*/
app.get('/products', async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
/**
* Express route to update a product
* @param {Object} req - Express request object
* @param {Object} res - Express response object
*/
app.put('/products/:id', async (req, res) => {
  try {
const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
/**
* Express route to delete a product
* @param {Object} req - Express request object
* @param {Object} res - Express response object
*/
app.delete('/products/:id', async (req, res) => {
  try {
await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});