export class ControlCenter{
    splashBtn: HTMLButtonElement;
    controlsBtn: HTMLButtonElement; 
    controls: HTMLDivElement;

    constructor(splashBtn: HTMLButtonElement,controlsBtn: HTMLButtonElement, controls:HTMLDivElement){
        this.splashBtn = splashBtn;
        this.controlsBtn = controlsBtn;
        this.controls = controls;
    }

    // handles if controls is visible
    showOrHideControls(){
        if(window.getComputedStyle(this.controls).display === "none"){
            this.controls.style.display = "flex"; 
            this.controlsBtn.style.setProperty("top", "55px");
            this.controlsBtn.innerHTML = "hide controls";      
        }else{
            this.controls.style.display = "none";
            this.controlsBtn.style.setProperty("top", "12px");
            this.controlsBtn.innerHTML = "show controls"; 
        }
    }
}