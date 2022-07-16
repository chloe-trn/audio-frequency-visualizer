export class Bars {
    container: HTMLDivElement;
    bars: HTMLDivElement[];
    numBars: number; 

    constructor(container: HTMLDivElement, bars: HTMLDivElement[], numBars: number){
        this.container = container;
        this.bars = bars;
        this.numBars = numBars;
    }

    // create initial bars for visualization
    createBars(colorThemes: string[][]) {
        for(let i = 0; i < this.numBars; i++) {
            let bar = document.createElement("div") as HTMLDivElement;
            bar.setAttribute("id", "bar"+ i);
            bar.setAttribute("class", "bar bar-hover-state");
            bar.style.background = colorThemes[0][i]; // color theme one is default
            this.bars.push(bar);
            this.container.append(bar);
        }
    }

    // handles if bars can be have pseudo state or not
    addRemoveHover(state: string){
        if(state == "add"){
            for(let i=0; i< this.numBars; i++){
                this.bars[i].classList.add("bar-hover-state");
            }
        }else{
            for(let i=0; i< this.numBars; i++){
                this.bars[i].classList.remove("bar-hover-state");
            }
        }
    }
}

