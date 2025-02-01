autowatch = 1;

const maxApi = require("max-api");
const io = require('socket.io-client');
var socket = io.connect('http://my.ccontrol.eu.ngrok.io');
//var server = io.connect('http://localhost:3010');

var colorData = {
    r: 0,
    g: 0,
    b: 0
}

var sampleData = {
	sample: 0,
	level: 0.0,
}

//var sampleNumber;

maxApi.addHandler('sendColor', (red,green,blue) => {
    colorData.r = red;
    colorData.g = green;
    colorData.b = blue;

    socket.emit('colorData', colorData);

	maxApi.post("rosso si spera", red, green, blue);
});

maxApi.addHandler('triggerSample', (volume, trackNumber) => {
    
	sampleData.level = volume;
	sampleData.sample = trackNumber;

    socket.emit('triggerSample', sampleData);

	maxApi.post("Trigger numero:", sampleData.sample);
	maxApi.post("volume:", sampleData.level);
});

maxApi.addHandler('stopSample', (trackNumber) => {
    
	//sampleNumber = trackNumber;

    socket.emit('stopSample', trackNumber);

    maxApi.post("Stop numero:", trackNumber);
});