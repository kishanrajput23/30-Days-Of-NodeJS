const express = require('express');
const authenticateAndAuthorize = require('./authMiddleware');

const app = express();

// Sample route with authentication and authorization middleware
app.get('/admin-route', authenticateAndAuthorize, (req, res) => {
  res.json({ message: 'Welcome to the admin route', user: req.user });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
