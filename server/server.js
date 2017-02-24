const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
var app = express();

app.use(express.static(publicPath));

app.listen(process.env.PORT,process.env.IP,function() {
    console.log('server is up on port '+process.env.PORT);    
});