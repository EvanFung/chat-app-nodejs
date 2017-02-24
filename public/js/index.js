//initiating the request,making a request from client to server to open up a web socket
//and keep that connection open
//socket变数的作用
//listen for data from the server
//send data to the server
var socket = io();
            
socket.on('connect',function() {
    console.log('connected to server');
    socket.emit('createMessage',{
        from:'evanfung',
        text:'屌你'
    });
});
            
socket.on('disconnect',function() {
    console.log('disconnected')
});


socket.on('newMessage',function(message) {
    console.log('The message is ',message);
});
