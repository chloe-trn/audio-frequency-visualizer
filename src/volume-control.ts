export class VolumeControl {
    soundBtn: HTMLButtonElement;
    muteBtn: HTMLButtonElement; 
    volumeSlider: HTMLInputElement;

    constructor(soundBtn: HTMLButtonElement, muteBtn: HTMLButtonElement, volumeSlider: HTMLInputElement){
        this.soundBtn = soundBtn;
        this.muteBtn = muteBtn;
        this.volumeSlider = volumeSlider;
    }
    // handles display of sound and mute volume buttons
    soundOrMute(state: string){
        if(state == "mute"){
            this.muteBtn.style.display = "block";
            this.soundBtn.style.display = "none";
        }else{
            this.muteBtn.style.display = "none";
            this.soundBtn.style.display = "block";
        }
    }
}