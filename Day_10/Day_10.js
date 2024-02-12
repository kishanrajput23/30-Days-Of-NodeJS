const express = require('express');
const path = require('path');
const app = express();
 
// Express middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
 
// Express route to handle the root ("/") and return "public/index.html"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/styles/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles', 'style.css'));
});
 
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});