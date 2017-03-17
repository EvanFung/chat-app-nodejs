//To join a room
//socket.join('The office fans');
        
//To leave a room
//socket.leave('The office fans');
        
//emit it to every single connected user
//io.emit();
        
//send the message to everyone connected to the socket server expect for the current user
//socket.broadcast.emit() -> socket.broadcast.to('The office fans').emit() (room version)

//this emits an event specifically to one user
//socket.emit()
        
//emit an event to everyone in its room. io.emit -> io.to
//it.to('The office fans')

//https://webdevbootcamp-evanfungv.c9users.io/
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
const generate = require('./utils/message');
const validation = require('./utils/validation');
const Users = require('./utils/users');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//https://evening-hamlet-53393.herokuapp.com/ | https://git.heroku.com/evening-hamlet-53393.git
app.use(express.static(publicPath));
var users = new Users();
io.on('connection',(socket) => {
    console.log('New user come in');

    socket.on('join',(params,callback) => {
        
        if(!validation.isRealString(params.name) || !validation.isRealString(params.room)) {
            return callback('Name and room name are requireed!');
        }
        
        socket.join(params.room);
        //remove the user from its protential previous room
        users.removeUser(socket.id);
        //add user 
        users.addUser(socket.id,params.name,params.room);
        
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        
        //socket.emit from admin text welcome to chat app
        socket.emit('newMessage',generate.generateMessage('Admin','Welcome to the chat app'));
        //socket.broadcast.emit from admin text New user joined
        socket.broadcast.to(params.room).emit('newMessage',generate.generateMessage('Admin',`${params.name} has joined`));
        
        callback();
    });
    
    socket.on('createMessage',(message,callback) => {
        var user = users.getUser(socket.id);
        
        if(user && validation.isRealString(message.text)) {
            //it emits an event to every single connection
            io.to(user.room).emit('newMessage',generate.generateMessage(user.name,message.text));            
        }
        callback();
    });
    
    socket.on('createLocationMessage',(coords) => {
        var user = users.getUser(socket.id);
        if(user) {
         io.to(user.room).emit('newLocationMessage',generate.generateLocationMessage(user.name,coords.latitude,coords.longitude));   
        }
    });
    
    
    //socket argument代表着当前和你连接的user
    socket.on('disconnect',() => {
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generate.generateMessage('Admin',`${user.name} has left`));   
        }
        
        console.log('User was disconnected')
    });
});



server.listen(process.env.PORT,process.env.IP,function() {
    console.log('server is up on port '+process.env.PORT);    
});