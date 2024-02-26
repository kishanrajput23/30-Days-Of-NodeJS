const mongoose = require('mongoose');
 
// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});
 
// Define the Product schema with a reference to Category
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { collection: 'testing' }); // Specify the collection name here
 
// Create the Mongoose model for Category
const Category = mongoose.model('Category', categorySchema);
 
// Create the Mongoose model for Product with reference to Category
const Product = mongoose.model('Product', productSchema);
 
/**
* Retrieves all products with populated category details from MongoDB
* @returns {Array} - Array of product objects with populated category details
*/
async function getProductsPopulatedWithCategory() {
  try {
    // Use Mongoose's populate method to retrieve products with populated category details
    const productsWithCategory = await Product.find().populate('category');
    console.log('Products with populated category details:', productsWithCategory);
    return productsWithCategory;
  } catch (error) {
    console.error('Error retrieving products with populated category details:', error.message);
    return [];
  }
}
 
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(async () => {
    console.log('Connected to MongoDB');
 
    // Example usage:
    const category = await Category.create({ name: 'Electronics' });
 
    await Product.create({ name: 'Laptop', price: 999.99, quantity: 10, category: category._id });
    await Product.create({ name: 'Smartphone', price: 599.99, quantity: 20, category: category._id });
 
    await getProductsPopulatedWithCategory();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });