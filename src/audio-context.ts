export class AudioInfo {
    audioCtx: AudioContext | undefined;
    analyzerNode: AnalyserNode | undefined; 
    freqDataArray: Uint8Array | undefined;

    constructor(audioCtx: AudioContext | undefined, analyzerNode: AnalyserNode | undefined, freqDataArray: Uint8Array | undefined){
        this.audioCtx = audioCtx;
        this.analyzerNode = analyzerNode;
        this.freqDataArray = freqDataArray;
    }
}

// create audio context object to get frequency data
export function createAudioContext(audio: HTMLAudioElement, audioInfo: AudioInfo){
    let AudioContext = window.AudioContext || window.webkitAudioContext || false;  // create new audio context object

    if (AudioContext){
        let audioCtx: AudioContext = new AudioContext();

        let sourceNode: MediaElementAudioSourceNode = audioCtx.createMediaElementSource(audio); // pass DOM audio into Audio Context to create the source node

        let analyzerNode: AnalyserNode = audioCtx.createAnalyser(); // create processing node
        analyzerNode.fftSize = 2048;                  // define fast fourier transform window size
        analyzerNode.smoothingTimeConstant = 0.9;

        sourceNode.connect(analyzerNode).connect(audioCtx.destination); // connect input node to analyzer node and then to the destination node

        let freqArrayLength: number = analyzerNode.frequencyBinCount;           // the number of frequency values we have available for visualization
        let freqDataArray: Uint8Array = new Uint8Array(freqArrayLength);            // create frequency array of unsigned integer type

        analyzerNode.getByteFrequencyData(freqDataArray);               // pass frequency array into the analyzer node and change it into byte format

        audioInfo.audioCtx = audioCtx;                 // store audio info in object
        audioInfo.analyzerNode = analyzerNode;
        audioInfo.freqDataArray = freqDataArray;
        return [audioCtx, analyzerNode, freqDataArray];

    } else {
        alert("The Web Audio API is not supported by your browser.")
        return;
    }
    
}