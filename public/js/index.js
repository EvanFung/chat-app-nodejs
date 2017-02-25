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

socket.emit('createMessage',{
    from:'Frank',
    text:'Hi'
},function(data) {
    //当成功发送到server端的时候，server传来的成功或者失败的acknowlegment.
    console.log('Got it ' + data);
});

$('#message-form').on('submit',function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from:'User',
        text:$('[name=message]').val()
    },function() {
        
    });
});