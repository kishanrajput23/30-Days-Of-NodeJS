const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// Function to set up WebSocket server
function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('WebSocket connection established');

        // Event handler for incoming messages
        ws.on('message', (message) => {
            console.log(`Received message: ${message}`);

            // Echo the message back to the client
            ws.send(`Server echoed: ${message}`);
        });

        // Event handler for closing the connection
        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });
}

// Set up WebSocket server
setupWebSocket(server);

// Express route serving HTML page with WebSocket connection
app.get('/websocket', (req, res) => {
    res.sendFile(__dirname + '/websocket.html');
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
