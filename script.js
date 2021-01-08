/*
 TODO: 
    - add another song 
    - add class for controls - transiton variables to class of control center 
    - assign functions to classes!
    - make responsive
*/

const colorThemes = [
    ["#C6FFDD","#CAFDD7","#CFF9D0","#D2F6C9","#D3F5C8",  // citrus
      "#D6F3C3","#DBEEB9","#E0ECB3","#E3EAAE","#E4E8AB","#E6E6A8","#E6E0A0",
      "#ECE29F","#EEE09A","#F0E098","#F2DE95","#F5DB8F","#F8D98A","#FAD888",
      "#FBD686","#FBD385","#FBCA85","#FAC584","#FAC284","#FABF84","#FABD84",
      "#FABB83","#FAB283","#FAAC82","#F9A782","#F9A581","#F9A381","#F99A80",
    "#F8967F","#F88F7F","#F88D7F","#F7877E","#F77F7D","#F77B7D","#F8888A"],

    ["#13C2E9","#21BCEA","#2FB4E9","#3AAFEA","#45ABEA",  // galaxy
    "#49A9EA","#52A5EA","#619EEB","#699BEB","#7098EB","#7694EB","#8190EC",
    "#878DEC","#9587ED","#9E83EC","#A380EC","#B17AEC","#BD74ED","#BF73ED",
    "#C571ED","#C76FE5","#C86EE0","#CC6BD5","#CF69CC","#D269C7","#D367C1",
    "#D566BB","#D764B4","#DA61AA","#DD60A2","#DF5E9C","#E15E99","#E45B8E",
    "#E75985","#E9577D","#EA587E","#F15368","#F25267","#F46270","#F64F59"],

    ["#75EBD6","#75E9D5","#77E8D6","#7AE6D7","#7BE5D7",  // seafoam 
    "#7CE4D7","#7EE1D8","#7FE1D8","#81E0D9","#82DED9","#83DDD9","#85DBDA",
    "#87DADB","#88D8DB","#89D7DB","#8AD6DB","#8BD5DC","#8CD4DB","#8ED2DC",
    "#91D1DE","#92CFDE","#93CEDE","#95CCDF","#97CADF","#99CAE0","#9AC8E0",
    "#9AC7E0","#9BC6E0","#9DC5E1","#9EC3E1","#9FC1E1","#A0C2E2","#A3C0E3",
    "#A4BEE3","#A6BCE3","#A7BCE4","#A8BAE4","#AAB9E5","#ABB7E4","#ACB6E5"]
];
const gradients = [
    "linear-gradient(to right, #C6FFDD , #FBD786, #f7797d)", // citrus 
    "linear-gradient(to right, #12c2e9, #c471ed, #f7797d)",  // galaxy
    "linear-gradient(to right, #74ebd5, #ACB6E5)"            // seafoam
];

const songUrls = ['https://res.cloudinary.com/duvpi1rvn/video/upload/v1609947969/Ikson_-_Last_Summer_xyn0go.mp3',
'https://res.cloudinary.com/duvpi1rvn/video/upload/v1609954446/Jaylon_Ashaun_-_Goosebumps_zv7t66.mp3'];
const audioDuration = ["166","153"];

const splashBtn = document.getElementById("splashbtn");
const container = document.querySelector(".container");

const controls = document.querySelector(".controls");
const controlsBtn = document.querySelector(".controls-label");

const playBtn = document.getElementById("playbtn");
const pauseBtn = document.getElementById("pausebtn");
let progressBar = document.getElementById("progress-bar"); 
let progressWidth = progressBar.offsetWidth;
let fill = document.getElementById("fill");
let duration = document.getElementById("duration"); 
let currentDuration; 
let currentTime = document.getElementById("current-time"); 
let timer; 

const soundBtn = document.getElementById("soundbtn");
const muteBtn = document.getElementById("mutebtn");
const volume = document.getElementById("volumesldr"); 
let currentVolume; 

const colors = document.querySelector('.theme-select');
const songs = document.querySelector('.mp3-select');

let audio = document.querySelector("audio");
let source = document.querySelectorAll("source");
let audioInfo;

const numBars = 40;
let bars = [];
const defaultBarHeight = 8; 
const index = 23;   // frequency index interval
const offset = 8;   // frequency to start indexing at

class AudioInfo {
  constructor(audioCtx,analyzerNode,freqDataArray){
      this.audioCtx = audioCtx;
      this.analyzerNode = analyzerNode;
      this.freqDataArray = freqDataArray;
  }
}

class ControlCenter {
    constructor(audioPlayer,volumeControl,selectOptions){
        this.audioPlayer = audioPlayer;
        this.volumeControl = volumeControl;
        this.selectOptions = selectOptions;
    }
}

class AudioPlayer {
    constructor(playBtn,pauseBtn,progressBar,fill){
        this.playBtn = playBtn;
        this.pauseBtn = pauseBtn; 
        this.progressBar = progressBar; 
        this.fill = fill; 
    }
}
class VolumeControl {
    constructor(soundBtn,muteBtn,volumeSlider,currentVolume){
        this.soundBtn = soundBtn; 
        this.muteBtn = muteBtn;
        this.volumeSlider = volumeSlider; 
        this.currentVolume = currentVolume;
    }
}
class SelectOptions {
    constructor(mp3Select,themeSelect){
        this.mp3Select = mp3Select;
        this.themeSelect = themeSelect;
    }
}

let audioPlayer = new AudioPlayer();
let volumeControl = new VolumeControl();
let selectOptions = new SelectOptions();
let controlCenter = new ControlCenter();

// FUNCTIONS:  

// create audio context object to get frequency data 
function createAudioContext(){
    let AudioContex = window.AudioContext || window.webkitAudioContext;  // create new audio context object
    let audioCtx = new AudioContext();

    let sourceNode = audioCtx.createMediaElementSource(audio);           // pass DOM audio into Audio Context to create the source node

    let analyzerNode = audioCtx.createAnalyser(); // create processing node
    analyzerNode.fftSize = 2048;                  // define fast fourier transform window size
    analyzerNode.smoothingTimeConstant = 0.9;

    sourceNode.connect(analyzerNode).connect(audioCtx.destination); // connect input node to analyzer node and then to the destination node

    let freqArrayLength = analyzerNode.frequencyBinCount;           // the number of frequency values we have available for visualization
    let freqDataArray = new Uint8Array(freqArrayLength);            // create frequency array of unsigned integer type

    analyzerNode.getByteFrequencyData(freqDataArray);               // pass frequency array into the analyzer node and change it into byte format
    audioInfo = new AudioInfo(audioCtx,analyzerNode,freqDataArray); // store audio info in object 
}

// create initial audio bars for visualization
function createBars(){   
    for(let i = 0; i < numBars; i++) {
        let bar = document.createElement("div");
        bar.setAttribute("id", "bar"+ i);
        bar.setAttribute("class", "bar bar-hover-state");
        bar.style.background = colorThemes[0][i]; // color theme one is default 
        bars.push(bar);
        container.append(bar);           
    }
}

// change height of bars according to decibal value stored in frequency array
function displayBars(){

    let analyzerNode = audioInfo.analyzerNode;
    let freqDataArray = audioInfo.freqDataArray;
  
    analyzerNode.getByteFrequencyData(freqDataArray); // get frequencies present at current audio moment
  
    for(let i = 0; i < numBars ; i++) { // loop through bars and change their heights
  
      base = freqDataArray[( i * index ) + offset ];             // get 3 frequencies in a row 
      backOne = freqDataArray[( ( i * index ) + offset ) - 1];
      forwardOne  = freqDataArray[( ( i * index ) + offset ) + 1];
  
      let averagedFreq = ( backOne + base + forwardOne ) / 3;    // average them
      let height = Math.max(averagedFreq, defaultBarHeight);     // calculate bar height
      bars[i].style.height = Math.round(height * 2.5) + "px";        // display bar
    }
    requestAnimationFrame(displayBars);  // call repeatedly 
}
// updates display of controls
function showOrHideControls(){
    if(window.getComputedStyle(controls).visibility === "hidden"){
        controls.style.visibility = "visible";
        controls.style.display = "flex";
        controlsBtn.style.top = "55px";
        controlsBtn.innerHTML = "hide controls";

    }else{
        controls.style.display = "none";
        controls.style.visibility = "hidden";
        controlsBtn.style.top = "13px";
        controlsBtn.innerHTML = "show controls";
    }
}
// handles display of play and pause buttons 
function playOrPause(state){
    if(state == "pause"){
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    }else{
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
    }
}
// handles display of audio duration based on song chosen 
function setDuration(index){
    currentDuration = audioDuration[index];                
    let min = parseInt(audioDuration[index] / 60);
    let sec = parseInt(audioDuration[index] % 60);
    duration.innerHTML = min+':'+sec; 
}
// gets current time in audio and displays it 
function updateTime(){
    if(!audio.ended){
        let currentMin = parseInt(audio.currentTime / 60); 
        let currentSec = parseInt(audio.currentTime % 60);
        if(currentSec < 10){
            currentTime.innerHTML = currentMin + ':0' + currentSec; 
        }else{
            currentTime.innerHTML = currentMin + ':' + currentSec; 
        }
        let length = parseInt((audio.currentTime * progressWidth) / currentDuration); 
        fill.style.width = length + 'px'; // update progress fill bar 
    }else{
        currentTime.innerHTML = "0:00"; 
        fill.style.width = "0px";
        playOrPause("pause");
        addRemoveHover("add");
    }
}
// handles clicking of audio progress bar, sets current time to new time
function progressClick(e){
    if(!audio.ended){
        let clickX = e.pageX - progressBar.offsetLeft;
        let newTime = clickX * currentDuration / progressWidth; 
        audio.currentTime = newTime;
        fill.style.width = clickX + 'px';
    }
}
// handles display of sound and mute volume buttons 
function soundOrMute(state){
    if(state == "mute"){
        muteBtn.style.display = "block";
        soundBtn.style.display = "none";
    }else{
        muteBtn.style.display = "none";
        soundBtn.style.display = "block";
    }
}
// handles selection of new song 
function changeSong(id){

    audio.remove();                          // delete html audio element 
    audio = null;                            // set global variable to empty 
    audio = document.createElement("AUDIO"); // create new html audio element 
    audio.crossOrigin = "anonymous"; 
    audio.src = songUrls[id];
    
    audioInfo.audioCtx.close().then(function() {  // remove current audio context
        createAudioContext();                     // create new audio context 
    });

    fill.style.width = "0px";
    setDuration(id);
    playOrPause("play");
    addRemoveHover("remove");
    audio.play();          // play new audio 
}

// handles selection of new theme 
function changeColor(index){
    for(let i=0; i< numBars; i++){
        bars[i].style.background = colorThemes[index][i];
    }
    fill.style.backgroundImage = gradients[index];
}
function addRemoveHover(state){
    if(state == "add"){
        for(let i=0; i< numBars; i++){
            bars[i].classList.add("bar-hover-state");
        }
    }else{
        for(let i=0; i< numBars; i++){
            bars[i].classList.remove("bar-hover-state");
        }
    }
}

// EVENT LISTENERS:
splashBtn.addEventListener('click', () =>{  // inital setup with defaults 
    addRemoveHover("remove");
    splashBtn.classList.add("display-none");
    controlsBtn.classList.remove("display-none");
    timer = setInterval(updateTime,500);
    createAudioContext();
    playOrPause("play");
    audio.play(); 
});
audio.addEventListener('play', () => {
    displayBars();
})
controlsBtn.addEventListener('click', () => {
    showOrHideControls();
});
playBtn.addEventListener('click', () => { 
    timer = setInterval(updateTime,500);
    playOrPause("play");
    addRemoveHover("remove");
    audio.play();
})
pauseBtn.addEventListener('click', () => {
    window.clearInterval(timer);
    playOrPause("pause");
    addRemoveHover("add");
    audio.pause();
})
progressBar.addEventListener('click', e => {
    progressClick(e);
})
soundBtn.addEventListener('click', () => {   
    audio.muted = true; 
    soundOrMute("mute");
});
muteBtn.addEventListener('click', () =>{
    audio.muted = false; 
    soundOrMute("sound");
});
volume.oninput = function() {
    audio.volume = this.value/100; 
}
songs.addEventListener('change', e => {
    changeSong(e.target.value);
});
colors.addEventListener('change', e => {
    changeColor(e.target.value);
});

(function() {
    createBars();
    fill.style.backgroundImage = gradients[0];
    setDuration(0);
})();

