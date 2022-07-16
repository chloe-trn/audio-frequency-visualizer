export class SelectOptions {
    songs: HTMLSelectElement;
    colors: HTMLSelectElement; 

    constructor(songs: HTMLSelectElement, colors: HTMLSelectElement){
        this.songs= songs;
        this.colors = colors;
    }
}