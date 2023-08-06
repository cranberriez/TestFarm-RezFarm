const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Endpoint to serve JSON data
app.get('/data', (req, res) => {
    // Load JSON file
    let data = require('./data/data.json'); // Replace with your JSON file path
    res.json(data);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
