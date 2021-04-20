var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
  id: 1,
text: "En este foro se desarrolla el tema de lo que implica tener COVID-19 en casa",
author: "Administrador",
view:0
}];

var messages2 = [{
  id: 1,
text: "En este foro se desarrolla la pregunta ¿Tengo sintomas COVID-19?, no lo se tu dime",
author: "Administrador",
view:1
}];

var messages3 = [{
  id: 1,
text: "En este foro se desarrolla el tema de prevención contra el COVID-19",
author: "Administrador",
view:2
}];

var messages4 = [{
  id: 1,
text: "En este foro se desarrolla el tema sobre el estres que implica estar en confinamiento en época COVID-19",
author: "Administrador",
view:3
}];

var messagesArray = [messages,messages2,messages3,messages4];

app.use(express.static('public'));

app.get('/hello', function(req, res) {
 res.status(200).send("Hello Worasasld!");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.on('view',function(view){
    socket.emit('messages', messagesArray);
  });
socket.on('new-message', function(data) {
    var view = parseInt(data.view);
    messagesArray[view-1].push(data);
    console.log(messagesArray[view-1],'se envió');
    io.emit('messages', messagesArray);
  });
});

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});