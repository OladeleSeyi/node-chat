const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,  '../public');

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connection');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome aboard me hearty'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'Here is a new guy'));

  socket.on('createMessage', (message, callback) => {
    console.log('New message', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback();

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })


  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })


  socket.on('disconnect', () => {
    console.log("User was disconnected");
  });

});

server.listen(port, () => {
  console.log(`Server is running on ${port}` );
});
module.exports = {app};
