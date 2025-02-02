var socket = require('socket.io');
var express = require('express');
var app = express();
var clientPORT = process.env.PORT || 8080;
var client = app.listen(clientPORT);
var connections = socket(client);

app.use(express.static('public'));

connections.sockets.on('connection', newClientConnection);

function newClientConnection(socket){
    console.log('client connection: ' + socket.id);
    socket.on('colorData', printColors);
    socket.on('triggerSample', playSound);
    socket.on('loopSample', loopSound);
    socket.on('stopSample', stopSound);
    
    function printColors(colorData){
        connections.sockets.emit('colorData', colorData);
        console.log(colorData);
    }

    function playSound(triggerSample){
        connections.sockets.emit('triggerSample', triggerSample);
        console.log('triggering', triggerSample);
    }

    function loopSound(loopSample){
        connections.sockets.emit('loopSample', loopSample);
        console.log('looping', loopSample);
    }

    function stopSound(stopSample){
        connections.sockets.emit('stopSample', stopSample);
        console.log(stopSample);
    }
}

