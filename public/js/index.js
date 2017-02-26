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
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createAt:formattedTime
    });
    
    $("#messages").append(html);
    
    // var formattedTime = moment(message.createAt).format('h:mm a');
    // console.log('The message is ',message);
    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}:${message.text}`);
    // $('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Frank',
//     text:'Hi'
// },function(data) {
//     //当成功发送到server端的时候，server传来的成功或者失败的acknowlegment.
//     console.log('Got it ' + data);
// });

socket.on('newLocationMessage',function(message) {
   var formattedTime = moment(message.createAt).format('h:mm a');
   var template = $('#location-message-template').html();
   var html = Mustache.render(template,{
        url:message.url,
        from:message.from,
        createAt:formattedTime
    });
    
    $("#messages").append(html);
//   var li = $('<li></li>');
//   var a = $('<a target="_blank">My current location</a>');
//   li.text(`${message.from} ${formattedTime}:`);
//   a.attr('href',message.url);
//   li.append(a);
//   $('#messages').append(li);
});

$('#message-form').on('submit',function(e) {
    e.preventDefault();
    
    var messageTextbox = $('[name=message]');
    
    socket.emit('createMessage', {
        from:'User',
        text:messageTextbox.val()
    },function() {
        //after sent message, the input field should empty
        messageTextbox.val("");
    });
});

var locationButton = $('#send-location');
locationButton.on('click',function() {
    //if the browser does not support geolocation
    if(!navigator.geolocation) {
       return alert('Geolocation not supported by your browser'); 
    }
    
    locationButton.attr('disabled','disabled').text('Sending location...');
    
    //the first argument is success
    //the second argument is fail to get current position
    navigator.geolocation.getCurrentPosition(function(position) {
        //if the user successfully get the current position, the locationButton should be actived!
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        //if the user can not get the location, it should not disable the button.
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});