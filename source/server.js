//Importazione librerie
var socket = require('socket.io');
var express = require('express');

//Setup della libreria express
var app = express();

//Setup della porta del CLIENT e della porta del CONTROLLER
var clientPORT = process.env.PORT || 8080;
//var controlPORT = process.env.PORT || 3010;
var client = app.listen(clientPORT);
//var control = app.listen(controlPORT);

//Reindirizzamento al materiale della cartella public, dove c'è il codice client-side
app.use(express.static('public'));

//Setup delle connessioni via protocollo Web-Socket
//var master = socket(control);
var slave = socket(client);

//A una nuova connessione esegui una funzione (secondo argomento)
slave.sockets.on('connection', newClientConnection);
//master.sockets.on('connection', newMaxConnection);

//Nuova Connessione Client
function newClientConnection(socket){
    //Stampa l'ID del client
    console.log('client connection: ' + socket.id);

/*
}

//Nuova Connessione Controller
function newMaxConnection(socket){
    //Stampa l'ID del controller
    console.log('max connection: ' + socket.id);
*/

    //Se arriva un controllo di colorData, esegui printColors()
    socket.on('colorData', printColors);

    //Se arriva un controllo di triggerSample, esegui playSound()
    socket.on('triggerSample', playSound);

    //Se arriva un controllo di loopSample, esegui loopSound()
    socket.on('loopSample', loopSound);

    //Se arriva un controllo di stopSample, esegui stopSound()
    socket.on('stopSample', stopSound);
  
    
    function printColors(colorData){
        //Emetti il colorData a tutti i sockets
        slave.sockets.emit('colorData', colorData);
        console.log(colorData);
    }

    
    function playSound(triggerSample){
        //Emetti il triggerSample a tutti i sockets
        slave.sockets.emit('triggerSample', triggerSample);
        console.log('triggering', triggerSample);
    }

    function loopSound(loopSample){
        //Emetti il loopSample a tutti i sockets
        slave.sockets.emit('loopSample', loopSample);
        console.log('looping', loopSample);
    }

    function stopSound(stopSample){
        //Emetti il stopSample a tutti i sockets
        slave.sockets.emit('stopSample', stopSample);
        console.log(stopSample);
    }
}

