const colorThemeOne = ["#C6FFDD","#CAFDD7","#CFF9D0","#D2F6C9","#D3F5C8",
      "#D6F3C3","#DBEEB9","#E0ECB3","#E3EAAE","#E4E8AB","#E6E6A8","#E6E0A0",
      "#ECE29F","#EEE09A","#F0E098","#F2DE95","#F5DB8F","#F8D98A","#FAD888",
      "#FBD686","#FBD385","#FBCA85","#FAC584","#FAC284","#FABF84","#FABD84",
      "#FABB83","#FAB283","#FAAC82","#F9A782","#F9A581","#F9A381","#F99A80",
    "#F8967F","#F88F7F","#F88D7F","#F7877E","#F77F7D","#F77B7D","#F8888A"];

const colorThemeTwo = ["#13C2E9","#21BCEA","#2FB4E9","#3AAFEA","#45ABEA",
    "#49A9EA","#52A5EA","#619EEB","#699BEB","#7098EB","#7694EB","#8190EC",
    "#878DEC","#9587ED","#9E83EC","#A380EC","#B17AEC","#BD74ED","#BF73ED",
    "#C571ED","#C76FE5","#C86EE0","#CC6BD5","#CF69CC","#D269C7","#D367C1",
    "#D566BB","#D764B4","#DA61AA","#DD60A2","#DF5E9C","#E15E99","#E45B8E",
    "#E75985","#E9577D","#EA587E","#F15368","#F25267","#F46270","#F64F59"];

const colorThemeThree = ["#75EBD6","#75E9D5","#77E8D6","#7AE6D7","#7BE5D7",
    "#7CE4D7","#7EE1D8","#7FE1D8","#81E0D9","#82DED9","#83DDD9","#85DBDA",
    "#87DADB","#88D8DB","#89D7DB","#8AD6DB","#8BD5DC","#8CD4DB","#8ED2DC",
    "#91D1DE","#92CFDE","#93CEDE","#95CCDF","#97CADF","#99CAE0","#9AC8E0",
    "#9AC7E0","#9BC6E0","#9DC5E1","#9EC3E1","#9FC1E1","#A0C2E2","#A3C0E3",
    "#A4BEE3","#A6BCE3","#A7BCE4","#A8BAE4","#AAB9E5","#ABB7E4","#ACB6E5"];

const songUrls = ['https://res.cloudinary.com/duvpi1rvn/video/upload/v1609947969/Ikson_-_Last_Summer_xyn0go.mp3',
'https://res.cloudinary.com/duvpi1rvn/video/upload/v1609954446/Jaylon_Ashaun_-_Goosebumps_zv7t66.mp3'];

const numBars = 40;
const container = document.querySelector(".container");
let audio = document.querySelector("audio");
const playBtn = document.getElementById("playbtn");
const pauseBtn = document.getElementById("pausebtn");
const colors = document.querySelectorAll(".color");
const songs = document.querySelectorAll(".mp3");

const index = 23;   // determines frequency index interval
const offset = 8;   // determines what frequency to start indexing at
let firstPlay = 0 ;
let audioInfo;
const defaultBarHeight = 13; 

class AudioInfo {
  constructor(audioCtx,analyzerNode,freqDataArray){
      this.audioCtx = audioCtx;
      this.analyzerNode = analyzerNode;
      this.freqDataArray = freqDataArray;
  }
}

// change height of bars according to decibal value stored in frequency data array
function displayBars(){

    let analyzerNode = audioInfo.analyzerNode;
    let freqDataArray = audioInfo.freqDataArray;
  
    analyzerNode.getByteFrequencyData(freqDataArray); // get frequencies present at current audio moment
  
    for(let i = 0; i < numBars ; i++) { // loop through bars and change their heights
  
      base = freqDataArray[( i * index ) + offset ];             // get frequencies
      backOne = freqDataArray[( ( i * index ) + offset ) - 1];
      forwardOne  = freqDataArray[( ( i * index ) + offset ) + 1];
  
      let averagedFreq = ( backOne + base + forwardOne ) / 3;    // average them
      let bar = document.querySelector("#bar" + i);              // get current bar associated with frequency
      let height = Math.max(averagedFreq, defaultBarHeight);                   // calculate bar height
      bar.style.height = Math.round(height * 1.5) + "px";        // display bar
    }
    requestAnimationFrame(displayBars);
  }
  
  // create audio bars for visualization
  function createBars(){
     
      for(let i = 0; i < numBars; i++) {
          let bar = document.createElement("div");
          bar.setAttribute("id", "bar"+ i);
          bar.setAttribute("class", "bar");
          bar.style.background = colorThemeOne[i];
          $(".container").append(bar);             // display bars on DOM
      }
  }
  
  function changeColor(colorTheme){
      console.log(colorTheme);
      let theme; 
      if(colorTheme == 'citrus'){
          theme = colorThemeOne; 
      }else if(colorTheme == 'galaxy'){
          theme = colorThemeTwo; 
      }else{
          theme = colorThemeThree;
      }
      for(let i=0; i< numBars; i++){
          let bar = document.getElementById("bar"+i);
          bar.style.background = theme[i];
      }
  }

function createAudioContext(){
    let AudioContex = window.AudioContext || window.webkitAudioContext;  // create new Audio Context object
    let audioCtx = new AudioContext();
    console.log(audioCtx.state);

    let sourceNode = audioCtx.createMediaElementSource(audio); // pass DOM audio into Audio Context to create the source node

    let analyzerNode = audioCtx.createAnalyser(); // create processing node
    analyzerNode.fftSize = 2048;  // define fast fourier transform window size
    analyzerNode.smoothingTimeConstant = 0.9;

    sourceNode.connect(analyzerNode).connect(audioCtx.destination);  // connect input node to analyzer node and then to the destination node
    console.log(audioCtx.state);

    let freqArrayLength = analyzerNode.frequencyBinCount; // the number of frequency values we have available for visualization
    let freqDataArray = new Uint8Array(freqArrayLength); // create frequency array of unsigned integer type and of corresponding frequency length

    // pass the frequency data array into the analyzer node and change it into byte format
    analyzerNode.getByteFrequencyData(freqDataArray);
    audioInfo = new AudioInfo(audioCtx,analyzerNode,freqDataArray);
}

function changeSong(id){

    audio.remove(); // delete html audio element 
    audio = null;   // set global variable to empty 

    audio = document.createElement("AUDIO"); // create new html audio element 
    audio.crossOrigin = "anonymous"; 

    if(id == 'song1'){  // identify new audio source
        audio.src = songUrls[0];
    }else{ 
        audio.src = songUrls[1];
    }

    audioInfo.audioCtx.close().then(function() {  // remove current audio context
        createAudioContext();  // create new audio context 
    });

    audio.play();  // play new audio 
}

colors.forEach(function(color) {
    color.addEventListener('click', e => {
        changeColor(color.innerHTML);
    })
})

songs.forEach(function(song) {
    song.addEventListener('click', e => {
        
        changeSong(song.id);
    })
})

playBtn.addEventListener('click', e => { //listen for click
    if(firstPlay == 0 ){
        createAudioContext();
        audio.play(); 
    }else{  // not the first click
        audio.play();
    }
    firstPlay++;
    console.log(audioInfo);
})

pauseBtn.addEventListener('click', e => {
    audio.pause();
})

audio.addEventListener('play', function() {
    console.log("um");
    if( firstPlay > 0 ){
        // if IE --> do set interval for smoother animation, else --> request animation frame
        displayBars();  // on audio play, call the animation
    }
});

$( document ).ready(function() {
    createBars();
});
