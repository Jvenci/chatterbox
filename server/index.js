const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('A new connection has formed');

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room);
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User has terminated connection');
  });
});
app.use(router);

server.listen(PORT, () => console.log(`Server initialized on port ${PORT}`));
