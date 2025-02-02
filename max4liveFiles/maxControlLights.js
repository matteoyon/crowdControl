autowatch = 1;

const maxApi = require("max-api");
const io = require('socket.io-client');
var socket = io.connect('http://my.ccontrol.eu.ngrok.io');

var colorData = {
    velocity: 0,
	scene: 0
}

maxApi.addHandler('lightsOn', (v, s) => {
    colorData.velocity = v;
	colorData.scene = s;
    socket.emit('colorData', colorData);
	maxApi.post("Emitting colors: ", v, s);
});