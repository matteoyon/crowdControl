autowatch = 1;

const maxApi = require("max-api");
const io = require('socket.io-client');
var socket = io.connect('https://my.ccontrol.eu.ngrok.io');

var colorData = {
    r: 0,
    g: 0,
    b: 0
}

var loopData = {
	sample: 0,
	level: 0.0,
}

maxApi.addHandler('loopSample', (volume, trackNumber) => {
    
	loopData.level = volume;
	loopData.sample = trackNumber;
	
    socket.emit('loopSample', loopData);

	maxApi.post("Loop numero:", loopData.sample);
	maxApi.post("volume:", loopData.level);
});

maxApi.addHandler('stopSample', (trackNumber) => {

    socket.emit('stopSample', trackNumber);

    maxApi.post("Stop numero:", trackNumber);
});