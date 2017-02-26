//https://webdevbootcamp-evanfungv.c9users.io/
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
const generate = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//https://evening-hamlet-53393.herokuapp.com/ | https://git.heroku.com/evening-hamlet-53393.git
app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('New user come in');
    
    
    //socket.emit from admin text welcome to chat app
    socket.emit('newMessage',generate.generateMessage('Admin','Welcome to the chat app'));
    //socket.broadcast.emit from admin text New user joined
    socket.broadcast.emit('newMessage',generate.generateMessage('Admin','New User Joined'));
    socket.on('createMessage',(message,callback) => {
        console.log(message);
        //it emits an event to every single connection
        io.emit('newMessage',generate.generateMessage(message.from,message.text));
        callback('This is from server!');
    });
    
    socket.on('createLocationMessage',(coords) => {
        socket.emit('newLocationMessage',generate.generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });
    
    
    //socket argument代表着当前和你连接的user
    socket.on('disconnect',() => {
        console.log('User was disconnected')
    });
});



server.listen(process.env.PORT,process.env.IP,function() {
    console.log('server is up on port '+process.env.PORT);    
});