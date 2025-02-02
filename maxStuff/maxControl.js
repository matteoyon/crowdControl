autowatch = 1;

const maxApi = require("max-api");
const io = require('socket.io-client');
var socket = io.connect('http://localhost:3010');

var colorData = {
    r: 0,
    g: 0,
    b: 0
}


maxApi.addHandler('sendColor', (red,green,blue) => {
    colorData.r = red;
    colorData.g = green;
    colorData.b = blue;

    socket.emit('colorData', colorData);
	maxApi.post("rosso si spera", red, green, blue);
});

maxApi.addHandler('triggerSample', (trackNumber) => {
    socket.emit('triggerSample', trackNumber);
	maxApi.post("Trigger numero:", trackNumber);
});

maxApi.addHandler('loopSample', (trackNumber) => {
    socket.emit('loopSample', trackNumber);
	maxApi.post("Loop numero:", trackNumber);
});

maxApi.addHandler('stopSample', (trackNumber) => {
    socket.emit('stopSample', trackNumber);
    maxApi.post("Stop numero:", trackNumber);
});