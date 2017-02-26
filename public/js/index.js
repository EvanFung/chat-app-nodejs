//initiating the request,making a request from client to server to open up a web socket
//and keep that connection open
//socket变数的作用
//listen for data from the server
//send data to the server
var socket = io();
            
socket.on('connect',function() {
    console.log('connected to server');
    // socket.emit('createMessage',{
    //     from:'evanfung',
    //     text:'屌你',
    //     createAt:new Date().getTime()
    // });
});
            
socket.on('disconnect',function() {
    console.log('disconnected')
});


socket.on('newMessage',function(message) {
    console.log('The message is ',message);
    var li = $('<li></li>');
    li.text(`${message.from}:${message.text}`);
    $('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Frank',
//     text:'Hi'
// },function(data) {
//     //当成功发送到server端的时候，server传来的成功或者失败的acknowlegment.
//     console.log('Got it ' + data);
// });

socket.on('newLocationMessage',function(message) {
   var li = $('<li></li>');
   var a = $('<a target="_blank">My current location</a>');
   li.text(`${message.from}:`);
   a.attr('href',message.url);
   li.append(a);
   $('#messages').append(li);
});

$('#message-form').on('submit',function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from:'User',
        text:$('[name=message]').val()
    },function() {
        
    });
});

var locationButton = $('#send-location');
locationButton.on('click',function() {
    //if the browser does not support geolocation
    if(!navigator.geolocation) {
       return alert('Geolocation not supported by your browser'); 
    }
    
    //the first argument is success
    //the second argument is fail to get current position
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        alert('Unable to fetch location');
    });
});