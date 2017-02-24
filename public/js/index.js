//initiating the request,making a request from client to server to open up a web socket
//and keep that connection open
//socket变数的作用
//listen for data from the server
//send data to the server
var socket = io();
            
socket.on('connect',function() {
    console.log('connected to server');
    
    socket.emit('createEmail',{
        to:'evanfung@app.com',
        text:'hey, i am evan'
    });
});
            
socket.on('disconnect',function() {
    console.log('disconnected')
});

socket.on('newEmail',function(email) {
    console.log('new email',email);
});