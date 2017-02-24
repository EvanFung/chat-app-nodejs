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
});
server.listen(process.env.PORT,process.env.IP,function() {
    console.log('server is up on port '+process.env.PORT);    
});