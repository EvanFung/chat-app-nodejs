//https://webdevbootcamp-evanfungv.c9users.io/
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//https://evening-hamlet-53393.herokuapp.com/ | https://git.heroku.com/evening-hamlet-53393.git
app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('New user come in');
    
    
    //socket.emit from admin text welcome to chat app
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chat app'
    });
    //socket.broadcast.emit from admin text New user joined
    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user joined',
        createAt:new Date().getTime()
    });
    socket.on('createMessage',(message) => {
        console.log(message);
        //it emits an event to every single connection
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createAt:new Date().getTime()
        });
        //fire the event to everybody but not myself
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createAt:new Date().getTime()
        // });
    })
    
    
    //socket argument代表着当前和你连接的user
    socket.on('disconnect',() => {
        console.log('User was disconnected')
    });
});
server.listen(process.env.PORT,process.env.IP,function() {
    console.log('server is up on port '+process.env.PORT);    
});