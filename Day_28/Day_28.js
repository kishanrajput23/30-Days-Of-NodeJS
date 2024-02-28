const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);

function setUpWebSocketServer(server) {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    console.log('A user connected'); 
    socket.on('message', (data) => {
      console.log('Message received:', data); 
      io.emit('message', data);
  });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

setUpWebSocketServer(server); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, ()=> {
  console.log('Server is running on http://localhost: 3000');
}) ;