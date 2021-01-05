// create audio bar constructor
function Bar(id,color){
  this.id = id;
  this.color = color;
}
// define audio bar prototype
Bar.prototype = {
  constructor: Bar, // define the constructor property
  describe: function() {
    console.log("My ID is "+ this.id );
  },
  display: "inline-block",  // can move visual things into constructor // defines style
  margin: "0 5px",
  width: "12px",
  height: "2px",
  border: "10px"
};
const numBars = 40;
const container = document.querySelector(".container");
const audio = document.querySelector("audio");
const colorThemeOne = ["#C6FFDD","#CAFDD7","#CFF9D0","#D2F6C9","#D3F5C8",
	  "#D6F3C3","#DBEEB9","#E0ECB3","#E3EAAE","#E4E8AB","#E6E6A8","#E6E0A0",
	  "#ECE29F","#EEE09A","#F0E098","#F2DE95","#F5DB8F","#F8D98A","#FAD888",
	  "#FBD686","#FBD385","#FBCA85","#FAC584","#FAC284","#FABF84","#FABD84",
	  "#FABB83","#FAB283","#FAAC82","#F9A782","#F9A581","#F9A381","#F99A80",
    "#F8967F","#F88F7F","#F88D7F","#F7877E","#F77F7D","#F77B7D","#F8888A"];

// create new Audio Context object
const AudioContex = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// pass DOM audio into Audio Context to create the source node
const sourceNode = audioCtx.createMediaElementSource(audio);

// create processing node
const analyzerNode = audioCtx.createAnalyser();
analyzerNode.fftSize = 2048;  // define fast fourier transform window size
analyzerNode.smoothingTimeConstant = 0.9;

// connect input node to analyzer node and then to the destination node
sourceNode.connect(analyzerNode).connect(audioCtx.destination);
const freqArrayLength = analyzerNode.frequencyBinCount; // the number of frequency values we have available for visualization
const freqDataArray = new Uint8Array(freqArrayLength); // create frequency array of unsigned integer type and of corresponding frequency length

// pass the frequency data array into the analyzer node and change it into byte format
analyzerNode.getByteFrequencyData(freqDataArray);

// create array to store audio bars
let barArray = new Array(freqDataArray.length);
// create audio bars for visualization
for(let i = 0; i < numBars ; i++) {
  // create bars and store them in array
  barArray[i] = new Bar(i,colorThemeOne[i]);
    // display bars on DOM
  let bar = document.createElement("div");
  bar.setAttribute("id", "bar"+ i);
  bar.style.display = barArray[i].display;
  bar.style.margin = barArray[i].margin;
  bar.style.width = barArray[i].width;
  bar.style.height = barArray[i].height;
  bar.style.background = barArray[i].color;
  bar.style.borderRadius = barArray[i].border;
  $(".container").append(bar);
}

const index = Math.round((freqDataArray.length / numBars) - 10) ; // determines frequency index interval
const offset = 8;  // determines what frequency to start indexing at

// change height of bars according to decibal value stored in frequency data array
function displayBars(){
  // get frequencies present at current audio moment
  analyzerNode.getByteFrequencyData(freqDataArray);
  // loop through bars and change their heights
  for(let i = 0; i < numBars ; i++) {
    // get frequencies in array one back and one forward from current frequency index with offset
    base = freqDataArray[( i * index ) + offset ];
    backOne = freqDataArray[( ( i * index ) + offset ) - 1];
    forwardOne  = freqDataArray[( ( i * index ) + offset ) + 1];
    // average them
    let averagedFreq = ( backOne + base + forwardOne ) / 3;
    // get current bar associated with frequency
    let bar = document.querySelector("#bar" + i);
    // calculate bar height
    let height = Math.max(averagedFreq, 2);
    // display bar
    bar.style.height = (height * 2) + "px";
  }
}

// on document load
$( document ).ready(function() {
  setInterval(function(){  // update bar heights every 50ms
     displayBars();
   }, 50);
});
