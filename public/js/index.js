var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

});


socket.on('newMessage', function (message) {
  console.log('got new message', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);

})

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a href="" target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

socket.on('disconnect',function  () {
  console.log('Disconnected from server ');
});

var messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  })
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported for your browser');
  }

  locationButton.attr('disabled', 'disabled').text('sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('send location');
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('send location');
  })
});
