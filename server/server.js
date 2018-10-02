const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname,  '../public');
const socketIO = require('socket.io');





var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connection');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome Aboard'
  })
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User joined'
  });

  socket.on('createMessage', (message) => {
    console.log('New message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', () => {
    console.log("User was disconnected");
  });

});

server.listen(port, () => {
  console.log(`Server is running on ${port}` );
});
module.exports = {app};
