var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'John@johnson.som',
    text: 'Got milk?'
  })
});


socket.on('newMessage', function (message) {
  console.log('got new message', message);
})

socket.on('disconnect',function  () {
  console.log('Disconnected from server ');
});
