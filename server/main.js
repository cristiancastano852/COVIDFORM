var express = require('express');
var app= express(); 
var server= require('http').Server(app);
var io= require('socket.io')(server);

var messages=[{
    id: 1,
    text: "soy un mensaje",
    author: "Alejandro"
}];

app.use(express.static('public'));

app.get('/hello',function(req,res){
    res.status(200).send("Hello world by Alejo");
});

io.on('connection', function(socket){
    console.log('Mensaje por Socket');
    socket.emit('messages',messages);

    socket.on('new-message', function(data){
        messages.push(data);
        
        io.sockets.emit('messages', messages);
    });
});

server.listen(8080,function(){
    console.log("Running server in http://localhost:8080");
});