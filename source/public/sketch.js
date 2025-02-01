//const { StereoFeedbackEffect } = require("tone/build/esm/effect/StereoFeedbackEffect");

var server = 'https://my.ccontrol.eu.ngrok.io'  //sostituire con l'indirizzo HTTPS dato da ngrok
var socket;


let samples = []; //Dichiaro l'array su cui caricare i samples
let scene = 0;
let userStarted = false; //Boolean per lo start audio
let avvia;

let lastArray = [];
let last = 0; //Tempo per l'ultimo evento di Throttling

//FUNZIONE DI PRELOAD
/*
In P5.js questa funzione serve come precaricamento prima di far partire lo sketch.
In questo caso la uso per fermare il context audio (per poterlo far ripartira all'input dell'utente)
sia per caricare i campioni audio.
*/
function preload(){
  getAudioContext().suspend(); //Sospende l'audio

  for (let i = 0; i < 127; i++) { //Iterazione per caricare i campioni a seconda di quanti ne siano scritti nell'array delle stringhe
    samples[i] = document.getElementById((i+1).toString());
    lastArray[i] = 0;
  }
}

function setup() {
  frameRate(10);
  //Crea una tela a tutto schermo
  var cnv = createCanvas(windowWidth,windowHeight);
  cnv.style('display', 'block');

  //Connetti i socket all'indirizzo del server
  socket = io.connect(server);
}

function draw() {

  if(userStarted){

    //Se ricevo colorData, eseguo changeBg()
    socket.on('colorData', changeBg);

    lightShow(scene);

    //Se ricevo trigger Sample
    socket.on('triggerSample', (triggerSample) => { //Costrutto di Javascript che mi permette di avere una funzione scritta all'interno di un'altra
      console.log("triggerSample");
      //Uso una funzione per il throttling in modo da non avere centinaia di messaggi che triggerano i campioni nello stesso istante
      throttle(playSound, triggerSample, 5);

    });

    //Se ricevo loopSample
    socket.on('loopSample', (loopSample) => { //Costrutto di Javascript che mi permette di avere una funzione scritta all'interno di un'altra
      console.log("loopSample");
      //Uso una funzione per il throttling in modo da non avere centinaia di messaggi che triggerano i campioni nello stesso istante
      throttle(loopSound, loopSample, 5);

    });

    //Se ricevo stopSample
    socket.on('stopSample', (stopSample) => { //Costrutto di Javascript che mi permette di avere una funzione scritta all'interno di un'altra

      //Uso una funzione per il throttling in modo da non avere centinaia di messaggi che triggerano i campioni nello stesso istante
      throttle(stopSound, stopSample, 5);

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

//Funzione che cambia le variabili r,g e b per il background
function changeBg(colorData) {
  if(colorData.velocity == 0){
    scene = 0;
  }else{
    scene = parseInt(colorData.scene);
  }
}

//Funzione che seleziona il campione da riprodurre dall'array
function playSound(triggerSample) {
  samples[parseInt(triggerSample.sample)].volume = triggerSample.level;
  samples[parseInt(triggerSample.sample)].play();
}

//Funzione che seleziona il campione da looppare dall'array
function loopSound(loopSample) {
  samples[parseInt(loopSample.sample)].volume = loopSample.level;
  samples[parseInt(loopSample.sample)].loop = true;
  samples[parseInt(loopSample.sample)].play();
}

//Funzione che seleziona il campione da fermare dall'array
function stopSound(stopSample) {
  samples[parseInt(stopSample)].pause();
  samples[parseInt(stopSample)].currentTime = 0.0;
  samples[parseInt(stopSample)].loop = false;
}

//Alla pressione del mouse/Tocco dello schermo
function mousePressed() {

  if(mouseX <= (width/2)+50 && mouseX >= (width/2)-50 && mouseY <= height-100 && mouseY >= height-200){

    //Fai partire il contesto audio
    userStartAudio();
    console.log("here we go!");

    for (let i = 0; i < 9; i++) { //Iterazione per caricare i campioni a seconda di quanti ne siano scritti nell'array delle stringhe
      samples[i].volume = 0.0;
      samples[i].play();
      samples[i].pause();
      samples[i].currentTime = 0.0;
    }
    //cambia la flag booleana
    userStarted = true;
    fullscreen(true);
  }
}

function throttle(func, argument, delay) {

  //Dichiaro una costante per ottenere la il tempo istantaneo
  const now = new Date().getTime();
  console.log(lastArray[parseInt(argument)]);
  if (now - lastArray[parseInt(argument)] < delay) { //se il tempo passato è inferiore al delay
    return;//non fare nulla
  } //ALTRIMENTI:

  lastArray[parseInt(argument)] = now; //aggiorna l'ultimo istante
  return func(argument); //esegui la funzione passata in argomento a throttle()
}