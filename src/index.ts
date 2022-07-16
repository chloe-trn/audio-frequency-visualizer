// IMPORTS: 
import {SelectOptions} from "./select-options";
import {AudioInfo, createAudioContext} from './audio-context';
import {ControlCenter} from './control-center';
import {VolumeControl} from './volume-control';
import {AudioPlayer} from './audio-player';
import {Bars} from './bars';

// GLOBAL VARIABLES:

// select options: 
const colors = document.querySelector('#theme-select') as HTMLSelectElement;
const songs = document.querySelector('#mp3-select') as HTMLSelectElement;
const songUrls: string[] = ['assets/Ikson-Last-Summer.mp3', 'assets/Arulo-Be-This-Way.mp3'];
const colorThemes: string[][] = [ 
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
// start/control buttons: 
const splashBtn = document.getElementById("splashbtn") as HTMLButtonElement;
const controls = document.querySelector(".controls-wrapper") as HTMLDivElement;
const controlsBtn = document.querySelector(".controls-label") as HTMLButtonElement;

// main visualizer bars: 
const container = document.querySelector(".container") as HTMLDivElement; 
let bars: HTMLDivElement[] = []; // contains each bar object
const numBars: number = 35; // set number of bars
const defaultBarHeight: number = 8; // set bar height 
const barHeightMultiplier: number = 1.9; // set bar height scale
const index: number = 18; // frequency index interval
const offset: number = 75; // frequency to start indexing at

// audio player: 
const playBtn = document.getElementById("playbtn") as HTMLButtonElement;
const pauseBtn = document.getElementById("pausebtn") as HTMLButtonElement;
let progressBar = document.getElementById("progress-bar") as HTMLInputElement;
const progressGradients: string[][] = [ // define colors for linear gradient progress fill  
    ["#f7797d", "#FBD786", "#C6FFDD"],  // citrus
    ["#12c2e9", "#c471ed", "#f7797d"],  // galaxy
    ["#74ebd5", "#8ed2dc", "#ACB6E5"]   // seafoam
];
let firstColor: string = progressGradients[0][0];
let secondColor: string = progressGradients[0][1];
let thirdColor: string = progressGradients[0][2];
let progressPercent: number = 0; // initialize progress fill at 0 (start of audio)

// volume control:
const soundBtn = document.getElementById("soundbtn") as HTMLButtonElement;
const muteBtn = document.getElementById("mutebtn") as HTMLButtonElement;
const volumeSlider = document.getElementById("volume-slider") as HTMLInputElement;
let volumeLevel: number = 1; // initialize volume level at 1 (full volume)

// audio and timing: 
let audio = document.querySelector("audio") as HTMLAudioElement;
let duration = document.getElementById("duration") as HTMLSpanElement;
let elapsedTime = document.getElementById("elapsed-time") as HTMLElement;
let currentAudioDuration: number = 0;
let currentAudioElapsedTime: number = 0;

// INITIALIZATION OF OBJECTS:
let audioInfo: AudioInfo = new AudioInfo(undefined,undefined,undefined);
let controlCenter: ControlCenter = new ControlCenter(splashBtn,controlsBtn,controls);
let audioBars: Bars = new Bars(container,bars,numBars);
let audioPlayer: AudioPlayer = new AudioPlayer(playBtn,pauseBtn,progressBar);
let volumeControl: VolumeControl = new VolumeControl(soundBtn,muteBtn,volumeSlider);
let selectOptions: SelectOptions = new SelectOptions(songs,colors);

// DEFAULT SETTINGS: 
audioBars.createBars(colorThemes); // create initial bars 

// EVENT LISTENERS:
controlCenter.splashBtn.addEventListener('click', () =>{  
    // start visualizer with defaults on play button click: 
    controlCenter.splashBtn.classList.add("display-none");
    controlCenter.controlsBtn.classList.remove("display-none");
    audioBars.addRemoveHover("remove");
    audioPlayer.playOrPause("play");
    createAudioContext(audio,audioInfo);
    audio.play();
});
controlCenter.controlsBtn.addEventListener('click', () => {
    controlCenter.showOrHideControls();
});
audio.addEventListener('play', () => {
    renderBars();
});
audio.addEventListener('loadedmetadata', (e: Event) => {
    currentAudioDuration = Math.floor((e.target as HTMLAudioElement).duration);  // calculate duration for current audio 
    if (audioPlayer){
        audioPlayer.setDuration(duration,currentAudioDuration); // set duration for current audio
        audioPlayer.progressBar.setAttribute("max", currentAudioDuration.toString()); // set new max value for progress range
    }
});
audio.addEventListener('timeupdate', (e: Event) => {
    currentAudioElapsedTime = Math.round((e.target as HTMLAudioElement).currentTime); // get current audio time 
    audioPlayer.progressBar.value = currentAudioElapsedTime.toString();// update range slider with current audio time 
    audioPlayer.progressBar.setAttribute('aria-valuetext', currentAudioElapsedTime.toString() + ' seconds'); // announce current audio time to screen readers
    progressPercent = Math.floor((currentAudioElapsedTime / currentAudioDuration) * 100); // calculate elapsed time percentage
    updateTime();
});
audioPlayer.playBtn.addEventListener('click', () => {
    audioPlayer.playOrPause("play");
    audioBars.addRemoveHover("remove");
    audio.play();
});
audioPlayer.pauseBtn.addEventListener('click', () => {
    audioBars.addRemoveHover("add");
    audioPlayer.playOrPause("pause");
    audio.pause();
});
audioPlayer.progressBar.addEventListener('input', (e: Event) => {
    audio.currentTime = parseFloat((e.target as HTMLInputElement).value); // set audio current time to that value 
});
volumeControl.soundBtn.addEventListener('click', () => {
    volumeControl.soundOrMute("mute");
    audio.muted = true;
    setVolumeAria(0);
});
volumeControl.muteBtn.addEventListener('click', () =>{
    volumeControl.soundOrMute("sound");
    audio.muted = false;
    setVolumeAria(volumeLevel);
});
volumeControl.volumeSlider.addEventListener('input', (e: Event) =>{
    volumeLevel = parseFloat((e.target as HTMLInputElement).value) / 100; // calculate new volume level
    audio.volume = volumeLevel; // set new volume level
    setVolumeAria(volumeLevel);
});
selectOptions.songs.addEventListener('change', (e: Event) => {
    let id: number = parseInt((e.target as HTMLInputElement).value); // get id of selected song
    audio.src = songUrls[id]; // set audio src to selected song          
    audioPlayer.playOrPause("play"); 
    audioBars.addRemoveHover("remove"); 
    audio.play(); 
});
selectOptions.colors.addEventListener('change', (e: Event) => {
    let id: number = parseInt((e.target as HTMLInputElement).value); // get id of selected color theme
    for(let i=0; i< numBars; i++){
        bars[i].style.background = colorThemes[id][i]; // set each bar to the selected color theme
    }
    // set progress fill to selected color theme
    firstColor = progressGradients[id][0];
    secondColor = progressGradients[id][1];
    thirdColor = progressGradients[id][2];
});

// FUNCTIONS: 

// change height of bars according to decibal value stored in frequency array
function renderBars(){
    let analyzerNode: AnalyserNode | undefined = audioInfo.analyzerNode;
    let freqDataArray: Uint8Array | undefined = audioInfo.freqDataArray;

    if (analyzerNode && freqDataArray){
        analyzerNode.getByteFrequencyData(freqDataArray); // get frequencies present at current audio moment

        for(let i = 0; i < audioBars.numBars ; i++) { // loop through bars and change their heights

            let base: number = freqDataArray[( i * index ) + offset ]; // get 3 frequencies in a row
            let backOne: number = freqDataArray[( ( i * index ) + offset ) - 1];
            let forwardOne: number  = freqDataArray[( ( i * index ) + offset ) + 1];

            let averagedFreq: number = ( backOne + base + forwardOne ) / 3; // average them
            let height: number = Math.max(averagedFreq, defaultBarHeight); // calculate bar height
            bars[i].style.height = Math.round(height * barHeightMultiplier) + "px"; // display bar
        }
        requestAnimationFrame(renderBars); // call repeatedly
    } else {
        alert('This application is unable to run in your browser.')
    }
}

// get current time in audio and display it
function updateTime(){
    if(!audio.ended){
        let currentMin: number = Math.floor(currentAudioElapsedTime / 60);
        let currentSec: number = Math.floor(currentAudioElapsedTime % 60);
        if(currentSec < 10){
            elapsedTime.innerHTML = currentMin + ':0' + currentSec;
        }else{
            elapsedTime.innerHTML = currentMin + ':' + currentSec;
        }
        updateProgressGradient();
    }else{
        elapsedTime.innerHTML = "0:00";
        audioPlayer.playOrPause("pause");
        audioBars.addRemoveHover("add");
        updateProgressGradient();
    }
}
// set linear-gradient for progress bar as audio plays
function updateProgressGradient(){
    if(currentAudioDuration){
        let gradient: string = 'linear-gradient(to right,'+firstColor+' 0%, '+secondColor+','+thirdColor+' '+progressPercent+'%,#ffffff '+progressPercent+'%, #ffffff 100%)';
        progressBar.style.background = gradient;
    } 
}
// announce current volume level to screen readers
function setVolumeAria(volumeLevel: number){
    volumeControl.volumeSlider.setAttribute('aria-valuetext', 'volume level ' + volumeLevel.toString() + ' out of 1'); 
}