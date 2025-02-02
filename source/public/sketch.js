const server = 'https://my.ccontrol.eu.ngrok.io'  //sostituire con l'indirizzo HTTPS dato da ngrok
const DELAY_BETWEEN_SAMPLES = 5;
var socket;

let samples = [];
let scene = 0;
let userStarted = false;
let avvia;
let lastArray = [];
let last = 0;

function preload(){
  getAudioContext().suspend();

  for (let i = 0; i < 127; i++) {
    samples[i] = document.getElementById((i+1).toString());
    lastArray[i] = 0;
  }
}

function setup() {
  frameRate(10);
  var cnv = createCanvas(windowWidth,windowHeight);
  cnv.style('display', 'block');
  socket = io.connect(server);
}

function draw() {

  if(userStarted){

    socket.on('colorData', changeBg);
    lightShow(scene);

    socket.on('triggerSample', (triggerSample) => {
      console.log("triggerSample");
      throttle(playSound, triggerSample, DELAY_BETWEEN_SAMPLES);

    });

    socket.on('loopSample', (loopSample) => {
      console.log("loopSample");
      throttle(loopSound, loopSample, DELAY_BETWEEN_SAMPLES);

    });

    socket.on('stopSample', (stopSample) => {
      console.log("stopSample");
      throttle(stopSound, stopSample, DELAY_BETWEEN_SAMPLES);
    });

    
  } else {
    background(256);
    textSize(35);
    
    fill(0,255,0)
    circle(width/2,height-150,100);

    fill(0);

    let instruction = "ISTRUZIONI PER IL PUBBLICO:\n\n-Nelle impostazioni del dispositivo disattivare lo spegnimento automatico dello schermo ed aumentare la luminosità al massimo\n\n-Disattivare la suoneria per le chiamate e le notifiche ed aumentare al massimo il volume dei contenuti multimediali\n\n-Quando sei pronto premi il bottone verde"
    text(instruction, 10, 100, (width - 20));
  }
}

function changeBg(colorData) {
  if(colorData.velocity == 0){
    scene = 0;
  }else{
    scene = parseInt(colorData.scene);
  }
}

function playSound(triggerSample) {
  samples[parseInt(triggerSample.sample)].volume = triggerSample.level;
  samples[parseInt(triggerSample.sample)].play();
}

function loopSound(loopSample) {
  samples[parseInt(loopSample.sample)].volume = loopSample.level;
  samples[parseInt(loopSample.sample)].loop = true;
  samples[parseInt(loopSample.sample)].play();
}

function stopSound(stopSample) {
  samples[parseInt(stopSample)].pause();
  samples[parseInt(stopSample)].currentTime = 0.0;
  samples[parseInt(stopSample)].loop = false;
}

function mousePressed() {

  if(mouseX <= (width/2)+50 && mouseX >= (width/2)-50 && mouseY <= height-100 && mouseY >= height-200){

    userStartAudio();
    console.log("Started audio user audio context");

    for (let i = 0; i < 9; i++) {
      samples[i].volume = 0.0;
      samples[i].play();
      samples[i].pause();
      samples[i].currentTime = 0.0;
    }
    userStarted = true;
    fullscreen(true);
  }
}

//Check delay for triggering audio sample
function throttle(func, argument, delay) {
  const now = new Date().getTime();
  console.log(lastArray[parseInt(argument)]);
  if (now - lastArray[parseInt(argument)] >= delay) { 
    lastArray[parseInt(argument)] = now;
    return func(argument);
  }
}