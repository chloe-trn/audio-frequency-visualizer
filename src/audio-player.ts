export class AudioPlayer {
    playBtn: HTMLButtonElement;
    pauseBtn: HTMLButtonElement; 
    progressBar: HTMLInputElement;

    constructor(playBtn: HTMLButtonElement, pauseBtn: HTMLButtonElement, progressBar: HTMLInputElement){
        this.playBtn = playBtn;
        this.pauseBtn = pauseBtn;
        this.progressBar = progressBar;
    }
    //handles display of audio duration based on song chosen
    setDuration(duration: HTMLSpanElement, currentDuration: number){
        let min: number = Math.floor(currentDuration / 60);
        let sec: number = currentDuration % 60;
        duration.innerHTML = min+':'+sec;
    }
    // handles display of play and pause buttons
    playOrPause(state: string){
        if(state == "pause"){
            this.playBtn.style.display = "block";
            this.pauseBtn.style.display = "none";
        }else{
            this.playBtn.style.display = "none";
            this.pauseBtn.style.display = "block";
        }
    }
}