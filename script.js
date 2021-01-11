const colorThemes = [
    ["#F8888A","#F77F7D","#F7877E","#F88D7F", // citrus
    "#F88F7F","#F8967F","#F99A80","#F9A381","#F9A581","#F9A782","#FAAC82",
    "#FAB283","#FABB83","#FABD84","#FABF84","#FAC584","#FBCA85","#FBD385",
    "#FAD888","#F8D98A","#F2DE95","#F0E098","#EEE09A","#ECE29F","#E6E0A0",
    "#E6E6A8","#E4E8AB","#E3EAAE","#E0ECB3","#DBEEB9","#D6F3C3","#D3F5C8",
    "#D2F6C9","#CFF9D0","#C6FFDD"],

    ["#13C2E9","#2FB4E9","#3AAFEA","#45ABEA",  // galaxy
    "#49A9EA","#52A5EA","#619EEB","#699BEB","#7098EB","#7694EB","#8190EC",
    "#878DEC","#9587ED","#9E83EC","#A380EC","#B17AEC","#BD74ED","#BF73ED",
    "#C571ED","#C76FE5","#C86EE0","#CC6BD5","#D269C7","#D367C1","#D566BB",
    "#D764B4","#DA61AA","#DF5E9C","#E15E99","#E45B8E","#E75985","#EA587E",
    "#F15368","#F25267","#F64F59"],

    ["#75EBD6","#77E8D6","#7AE6D7","#7BE5D7",  // seafoam
    "#7CE4D7","#7EE1D8","#7FE1D8","#81E0D9","#82DED9","#83DDD9","#85DBDA",
    "#87DADB","#88D8DB","#89D7DB","#8AD6DB","#8BD5DC","#8CD4DB","#8ED2DC",
    "#91D1DE","#92CFDE","#93CEDE","#95CCDF","#9AC8E0","#9AC7E0","#9BC6E0",
    "#9DC5E1","#9EC3E1","#9FC1E1","#A0C2E2","#A3C0E3","#A4BEE3","#A7BCE4",
    "#A8BAE4","#AAB9E5","#ACB6E5"]
];
const gradients = [
    "linear-gradient(to right, #f7797d, #FBD786, #C6FFDD)", // citrus
    "linear-gradient(to right, #12c2e9, #c471ed, #f7797d)",  // galaxy
    "linear-gradient(to right, #74ebd5, #ACB6E5)"            // seafoam
];

const songUrls = ['https://res.cloudinary.com/duvpi1rvn/video/upload/v1610075717/Arulo_-_Be_This_Way_iear4b.mp3',
'https://res.cloudinary.com/duvpi1rvn/video/upload/v1609947969/Ikson_-_Last_Summer_xyn0go.mp3'];
const audioDuration = ["111","166"];
let duration = document.getElementById("duration");
let currentDuration;

const splashBtn = document.getElementById("splashbtn");
const controls = document.querySelector(".controls");
const controlsBtn = document.querySelector(".controls-label");

const playBtn = document.getElementById("playbtn");
const pauseBtn = document.getElementById("pausebtn");
let progressBar = document.getElementById("progress-bar");
let progressWidth = progressBar.offsetWidth;
let fill = document.getElementById("fill");

const soundBtn = document.getElementById("soundbtn");
const muteBtn = document.getElementById("mutebtn");
const volumeSlider = document.getElementById("volumesldr");
let currentVolume;

const colors = document.querySelector('.theme-select');
const songs = document.querySelector('.mp3-select');

const container = document.querySelector(".container");
const numBars = 35;
let bars = [];
const defaultBarHeight = 8;
let barHeightMultiplier =2.5;
const index = 18;   // frequency index interval
const offset = 75;   // frequency to start indexing at

let audio = document.querySelector("audio");
let currentTime = document.getElementById("current-time");
let timer;

class AudioInfo {
  constructor(audioCtx,analyzerNode,freqDataArray){
      this.audioCtx = audioCtx;
      this.analyzerNode = analyzerNode;
      this.freqDataArray = freqDataArray;
  }
}
class Bars {
    constructor(container,numBars,defaultBarHeight,index,offset){
        this.container = container;
        this.numBars = numBars;
        this.defaultBarHeight = defaultBarHeight;
        this.index = index;
        this.offset = offset;
    }
    // create initial bars for visualization
    createBars() {

        for(let i = 0; i < this.numBars; i++) {
            let bar = document.createElement("div");
            bar.setAttribute("id", "bar"+ i);
            bar.setAttribute("class", "bar bar-hover-state");
            bar.style.background = colorThemes[0][i]; // color theme one is default
            bars.push(bar);
            this.container.append(bar);
        }
    }
    // handles if bars can be have pseudo state or not
    addRemoveHover(state){
        if(state == "add"){
            for(let i=0; i< this.numBars; i++){
                bars[i].classList.add("bar-hover-state");
            }
        }else{
            for(let i=0; i< this.numBars; i++){
                bars[i].classList.remove("bar-hover-state");
            }
        }
    }
}
class ControlCenter{
    constructor(splashBtn,controlsBtn,controls){
        this.splashBtn = splashBtn;
        this.controlsBtn = controlsBtn;
        this.controls = controls;
    }
    // handles if controls is visible
    showOrHideControls(){
        if(window.getComputedStyle(this.controls).visibility === "hidden"){
            this.controls.style.visibility = "visible";
            this.controls.style.display = "flex";
            this.controlsBtn.style.top = "55px";
            this.controlsBtn.innerHTML = "hide controls";

        }else{
            this.controls.style.display = "none";
            this.controls.style.visibility = "hidden";
            this.controlsBtn.style.top = "13px";
            this.controlsBtn.innerHTML = "show controls";
        }
    }
}
class AudioPlayer {
    constructor(playBtn,pauseBtn,progressBar,fill){

        this.playBtn = playBtn;
        this.pauseBtn = pauseBtn;
        this.progressBar = progressBar;
        this.fill = fill;
    }
    // matches fill progress background color to the chosen theme
    setFillGradient(index) {
        fill.style.backgroundImage = gradients[index];
    }
    // handles display of audio duration based on song chosen
    setDuration(index){
        currentDuration = audioDuration[index];
        let min = parseInt(audioDuration[index] / 60);
        let sec = parseInt(audioDuration[index] % 60);
        duration.innerHTML = min+':'+sec;
    }
    // handles display of play and pause buttons
    playOrPause(state){
        if(state == "pause"){
            this.playBtn.style.display = "block";
            this.pauseBtn.style.display = "none";
        }else{
            this.playBtn.style.display = "none";
            this.pauseBtn.style.display = "block";
        }
    }
    // handles clicking of audio progress bar, sets current time to new time
    progressClick(e){
        if(!audio.ended){
            let clickX = e.pageX - progressBar.offsetLeft;
            let newTime = clickX * currentDuration / progressWidth;
            audio.currentTime = newTime;
            fill.style.width = clickX + 'px';
        }
    }
}
class VolumeControl {
    constructor(soundBtn,muteBtn,volumeSlider){

        this.soundBtn = soundBtn;
        this.muteBtn = muteBtn;
        this.volumeSlider = volumeSlider;
    }
    // handles display of sound and mute volume buttons
    soundOrMute(state){
        if(state == "mute"){
            this.muteBtn.style.display = "block";
            this.soundBtn.style.display = "none";
        }else{
            this.muteBtn.style.display = "none";
            this.soundBtn.style.display = "block";
        }
    }
}
class SelectOptions {
    constructor(songs,colors){

        this.songs= songs;
        this.colors = colors;
    }
    // handles selection of new song
    changeSong(id,audioPlayer,audioBars){

        audio.remove();                          // delete html audio element
        audio = null;                            // set global variable to empty
        audio = document.createElement("AUDIO"); // create new html audio element
        audio.crossOrigin = "anonymous";
        audio.src = songUrls[id];

        audioInfo.audioCtx.close().then(function() {  // remove current audio context
            createAudioContext();                     // create new audio context
        });

        audioPlayer.fill.style.width = "0px";
        audioPlayer.setDuration(id);              //audio player
        audioPlayer.playOrPause("play");
        audioBars.addRemoveHover("remove");
        audio.play();          // play new audio
    }
    // handles selection of new theme
    changeColor(index,fill,numBars){
        for(let i=0; i< numBars; i++){
            bars[i].style.background = colorThemes[index][i];
        }
        fill.style.backgroundImage = gradients[index];
    }
}
class Timer {
    constructor(timer){
        this.timer = timer;
    }
    start(){
        this.timer = setInterval(updateTime,500);
    }
    stop(){
        window.clearInterval(this.timer);
    }
}

// INITIALIZATION OF OBJECTS
let audioInfo = new AudioInfo();
let controlCenter = new ControlCenter(splashBtn,controlsBtn,controls);
let audioBars = new Bars(container,numBars,defaultBarHeight,index,offset,colorThemes);
let audioPlayer = new AudioPlayer(playBtn,pauseBtn,progressBar,fill);
let volumeControl = new VolumeControl(soundBtn,muteBtn,volumeSlider);
let selectOptions = new SelectOptions(songs,colors);
let audioTimer = new Timer(timer);

audioBars.createBars();
audioPlayer.setFillGradient(0);
audioPlayer.setDuration(0);

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

    audioInfo.audioCtx = audioCtx;                 // store audio info in object
    audioInfo.analyzerNode = analyzerNode;
    audioInfo.freqDataArray = freqDataArray;
}
// change height of bars according to decibal value stored in frequency array
function renderBars(){

    let analyzerNode = audioInfo.analyzerNode;
    let freqDataArray = audioInfo.freqDataArray;

    analyzerNode.getByteFrequencyData(freqDataArray); // get frequencies present at current audio moment

    for(let i = 0; i < audioBars.numBars ; i++) { // loop through bars and change their heights

      let base = freqDataArray[( i * index ) + offset ];             // get 3 frequencies in a row
      let backOne = freqDataArray[( ( i * index ) + offset ) - 1];
      let forwardOne  = freqDataArray[( ( i * index ) + offset ) + 1];

      let averagedFreq = ( backOne + base + forwardOne ) / 3;    // average them
      let height = Math.max(averagedFreq, defaultBarHeight);     // calculate bar height
      bars[i].style.height = Math.round(height * barHeightMultiplier) + "px";        // display bar
    }
    requestAnimationFrame(renderBars);  // call repeatedly
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
        audioPlayer.playOrPause("pause");
        audioBars.addRemoveHover("add");
    }
}
// EVENT LISTENERS:
controlCenter.splashBtn.addEventListener('click', () =>{  // inital setup with defaults
    controlCenter.splashBtn.classList.add("display-none");
    controlCenter.controlsBtn.classList.remove("display-none");
    audioTimer.start();
    audioBars.addRemoveHover("remove");
    audioPlayer.playOrPause("play");
    createAudioContext();
    audio.play();
});
audio.addEventListener('play', () => {
    renderBars();
})
controlCenter.controlsBtn.addEventListener('click', () => {
    controlCenter.showOrHideControls();
});
audioPlayer.playBtn.addEventListener('click', () => {
    audioTimer.start();
    audioPlayer.playOrPause("play");
    audioBars.addRemoveHover("remove");
    audio.play();
})
audioPlayer.pauseBtn.addEventListener('click', () => {
    audioTimer.stop();
    audioBars.addRemoveHover("add");
    audioPlayer.playOrPause("pause");
    audio.pause();
})
audioPlayer.progressBar.addEventListener('click', e => {
    audioPlayer.progressClick(e);
})
volumeControl.soundBtn.addEventListener('click', () => {
    volumeControl.soundOrMute("mute");
    audio.muted = true;

});
volumeControl.muteBtn.addEventListener('click', () =>{
    volumeControl.soundOrMute("sound");
    audio.muted = false;
});
volumeControl.volumeSlider.oninput = function() {
    audio.volume = this.value/100;
}
selectOptions.songs.addEventListener('change', e => {
    selectOptions.changeSong(e.target.value,audioPlayer,audioBars);
});
selectOptions.colors.addEventListener('change', e => {
    selectOptions.changeColor(e.target.value,audioPlayer.fill,audioBars.numBars);
});
