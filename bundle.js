/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/audio-context.ts":
/*!******************************!*\
  !*** ./src/audio-context.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioInfo": () => (/* binding */ AudioInfo),
/* harmony export */   "createAudioContext": () => (/* binding */ createAudioContext)
/* harmony export */ });
var AudioInfo = (function () {
    function AudioInfo(audioCtx, analyzerNode, freqDataArray) {
        this.audioCtx = audioCtx;
        this.analyzerNode = analyzerNode;
        this.freqDataArray = freqDataArray;
    }
    return AudioInfo;
}());

function createAudioContext(audio, audioInfo) {
    var AudioContext = window.AudioContext || window.webkitAudioContext || false;
    if (AudioContext) {
        var audioCtx = new AudioContext();
        var sourceNode = audioCtx.createMediaElementSource(audio);
        var analyzerNode = audioCtx.createAnalyser();
        analyzerNode.fftSize = 2048;
        analyzerNode.smoothingTimeConstant = 0.9;
        sourceNode.connect(analyzerNode).connect(audioCtx.destination);
        var freqArrayLength = analyzerNode.frequencyBinCount;
        var freqDataArray = new Uint8Array(freqArrayLength);
        analyzerNode.getByteFrequencyData(freqDataArray);
        audioInfo.audioCtx = audioCtx;
        audioInfo.analyzerNode = analyzerNode;
        audioInfo.freqDataArray = freqDataArray;
        return [audioCtx, analyzerNode, freqDataArray];
    }
    else {
        alert("The Web Audio API is not supported by your browser.");
        return;
    }
}


/***/ }),

/***/ "./src/audio-player.ts":
/*!*****************************!*\
  !*** ./src/audio-player.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioPlayer": () => (/* binding */ AudioPlayer)
/* harmony export */ });
var AudioPlayer = (function () {
    function AudioPlayer(playBtn, pauseBtn, progressBar) {
        this.playBtn = playBtn;
        this.pauseBtn = pauseBtn;
        this.progressBar = progressBar;
    }
    AudioPlayer.prototype.setDuration = function (duration, currentDuration) {
        var min = Math.floor(currentDuration / 60);
        var sec = currentDuration % 60;
        duration.innerHTML = min + ':' + sec;
    };
    AudioPlayer.prototype.playOrPause = function (state) {
        if (state == "pause") {
            this.playBtn.style.display = "block";
            this.pauseBtn.style.display = "none";
        }
        else {
            this.playBtn.style.display = "none";
            this.pauseBtn.style.display = "block";
        }
    };
    return AudioPlayer;
}());



/***/ }),

/***/ "./src/bars.ts":
/*!*********************!*\
  !*** ./src/bars.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bars": () => (/* binding */ Bars)
/* harmony export */ });
var Bars = (function () {
    function Bars(container, bars, numBars) {
        this.container = container;
        this.bars = bars;
        this.numBars = numBars;
    }
    Bars.prototype.createBars = function (colorThemes) {
        for (var i = 0; i < this.numBars; i++) {
            var bar = document.createElement("div");
            bar.setAttribute("id", "bar" + i);
            bar.setAttribute("class", "bar bar-hover-state");
            bar.style.background = colorThemes[0][i];
            this.bars.push(bar);
            this.container.append(bar);
        }
    };
    Bars.prototype.addRemoveHover = function (state) {
        if (state == "add") {
            for (var i = 0; i < this.numBars; i++) {
                this.bars[i].classList.add("bar-hover-state");
            }
        }
        else {
            for (var i = 0; i < this.numBars; i++) {
                this.bars[i].classList.remove("bar-hover-state");
            }
        }
    };
    return Bars;
}());



/***/ }),

/***/ "./src/control-center.ts":
/*!*******************************!*\
  !*** ./src/control-center.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlCenter": () => (/* binding */ ControlCenter)
/* harmony export */ });
var ControlCenter = (function () {
    function ControlCenter(splashBtn, controlsBtn, controls) {
        this.splashBtn = splashBtn;
        this.controlsBtn = controlsBtn;
        this.controls = controls;
    }
    ControlCenter.prototype.showOrHideControls = function () {
        if (window.getComputedStyle(this.controls).display === "none") {
            this.controls.style.display = "flex";
            this.controlsBtn.style.setProperty("top", "55px");
            this.controlsBtn.innerHTML = "hide controls";
        }
        else {
            this.controls.style.display = "none";
            this.controlsBtn.style.setProperty("top", "12px");
            this.controlsBtn.innerHTML = "show controls";
        }
    };
    return ControlCenter;
}());



/***/ }),

/***/ "./src/select-options.ts":
/*!*******************************!*\
  !*** ./src/select-options.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectOptions": () => (/* binding */ SelectOptions)
/* harmony export */ });
var SelectOptions = (function () {
    function SelectOptions(songs, colors) {
        this.songs = songs;
        this.colors = colors;
    }
    return SelectOptions;
}());



/***/ }),

/***/ "./src/volume-control.ts":
/*!*******************************!*\
  !*** ./src/volume-control.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VolumeControl": () => (/* binding */ VolumeControl)
/* harmony export */ });
var VolumeControl = (function () {
    function VolumeControl(soundBtn, muteBtn, volumeSlider) {
        this.soundBtn = soundBtn;
        this.muteBtn = muteBtn;
        this.volumeSlider = volumeSlider;
    }
    VolumeControl.prototype.soundOrMute = function (state) {
        if (state == "mute") {
            this.muteBtn.style.display = "block";
            this.soundBtn.style.display = "none";
        }
        else {
            this.muteBtn.style.display = "none";
            this.soundBtn.style.display = "block";
        }
    };
    return VolumeControl;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _select_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select-options */ "./src/select-options.ts");
/* harmony import */ var _audio_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio-context */ "./src/audio-context.ts");
/* harmony import */ var _control_center__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./control-center */ "./src/control-center.ts");
/* harmony import */ var _volume_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./volume-control */ "./src/volume-control.ts");
/* harmony import */ var _audio_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./audio-player */ "./src/audio-player.ts");
/* harmony import */ var _bars__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bars */ "./src/bars.ts");






var colors = document.querySelector('#theme-select');
var songs = document.querySelector('#mp3-select');
var songUrls = ['assets/Ikson-Last-Summer.mp3', 'assets/Arulo-Be-This-Way.mp3'];
var colorThemes = [
    ["#F8888A", "#F77F7D", "#F7877E", "#F88D7F",
        "#F88F7F", "#F8967F", "#F99A80", "#F9A381", "#F9A581", "#F9A782", "#FAAC82",
        "#FAB283", "#FABB83", "#FABD84", "#FABF84", "#FAC584", "#FBCA85", "#FBD385",
        "#FAD888", "#F8D98A", "#F2DE95", "#F0E098", "#EEE09A", "#ECE29F", "#E6E0A0",
        "#E6E6A8", "#E4E8AB", "#E3EAAE", "#E0ECB3", "#DBEEB9", "#D6F3C3", "#D3F5C8",
        "#D2F6C9", "#CFF9D0", "#C6FFDD"],
    ["#13C2E9", "#2FB4E9", "#3AAFEA", "#45ABEA",
        "#49A9EA", "#52A5EA", "#619EEB", "#699BEB", "#7098EB", "#7694EB", "#8190EC",
        "#878DEC", "#9587ED", "#9E83EC", "#A380EC", "#B17AEC", "#BD74ED", "#BF73ED",
        "#C571ED", "#C76FE5", "#C86EE0", "#CC6BD5", "#D269C7", "#D367C1", "#D566BB",
        "#D764B4", "#DA61AA", "#DF5E9C", "#E15E99", "#E45B8E", "#E75985", "#EA587E",
        "#F15368", "#F25267", "#F64F59"],
    ["#75EBD6", "#77E8D6", "#7AE6D7", "#7BE5D7",
        "#7CE4D7", "#7EE1D8", "#7FE1D8", "#81E0D9", "#82DED9", "#83DDD9", "#85DBDA",
        "#87DADB", "#88D8DB", "#89D7DB", "#8AD6DB", "#8BD5DC", "#8CD4DB", "#8ED2DC",
        "#91D1DE", "#92CFDE", "#93CEDE", "#95CCDF", "#9AC8E0", "#9AC7E0", "#9BC6E0",
        "#9DC5E1", "#9EC3E1", "#9FC1E1", "#A0C2E2", "#A3C0E3", "#A4BEE3", "#A7BCE4",
        "#A8BAE4", "#AAB9E5", "#ACB6E5"]
];
var splashBtn = document.getElementById("splashbtn");
var controls = document.querySelector(".controls-wrapper");
var controlsBtn = document.querySelector(".controls-label");
var container = document.querySelector(".container");
var bars = [];
var numBars = 35;
var defaultBarHeight = 8;
var barHeightMultiplier = 1.9;
var index = 18;
var offset = 75;
var playBtn = document.getElementById("playbtn");
var pauseBtn = document.getElementById("pausebtn");
var progressBar = document.getElementById("progress-bar");
var progressGradients = [
    ["#f7797d", "#FBD786", "#C6FFDD"],
    ["#12c2e9", "#c471ed", "#f7797d"],
    ["#74ebd5", "#8ed2dc", "#ACB6E5"]
];
var firstColor = progressGradients[0][0];
var secondColor = progressGradients[0][1];
var thirdColor = progressGradients[0][2];
var progressPercent = 0;
var soundBtn = document.getElementById("soundbtn");
var muteBtn = document.getElementById("mutebtn");
var volumeSlider = document.getElementById("volume-slider");
var volumeLevel = 1;
var audio = document.querySelector("audio");
var duration = document.getElementById("duration");
var elapsedTime = document.getElementById("elapsed-time");
var currentAudioDuration = 0;
var currentAudioElapsedTime = 0;
var audioInfo = new _audio_context__WEBPACK_IMPORTED_MODULE_1__.AudioInfo(undefined, undefined, undefined);
var controlCenter = new _control_center__WEBPACK_IMPORTED_MODULE_2__.ControlCenter(splashBtn, controlsBtn, controls);
var audioBars = new _bars__WEBPACK_IMPORTED_MODULE_5__.Bars(container, bars, numBars);
var audioPlayer = new _audio_player__WEBPACK_IMPORTED_MODULE_4__.AudioPlayer(playBtn, pauseBtn, progressBar);
var volumeControl = new _volume_control__WEBPACK_IMPORTED_MODULE_3__.VolumeControl(soundBtn, muteBtn, volumeSlider);
var selectOptions = new _select_options__WEBPACK_IMPORTED_MODULE_0__.SelectOptions(songs, colors);
audioBars.createBars(colorThemes);
controlCenter.splashBtn.addEventListener('click', function () {
    controlCenter.splashBtn.classList.add("display-none");
    controlCenter.controlsBtn.classList.remove("display-none");
    audioBars.addRemoveHover("remove");
    audioPlayer.playOrPause("play");
    (0,_audio_context__WEBPACK_IMPORTED_MODULE_1__.createAudioContext)(audio, audioInfo);
    audio.play();
});
controlCenter.controlsBtn.addEventListener('click', function () {
    controlCenter.showOrHideControls();
});
audio.addEventListener('play', function () {
    renderBars();
});
audio.addEventListener('loadedmetadata', function (e) {
    currentAudioDuration = Math.floor(e.target.duration);
    if (audioPlayer) {
        audioPlayer.setDuration(duration, currentAudioDuration);
        audioPlayer.progressBar.setAttribute("max", currentAudioDuration.toString());
    }
});
audio.addEventListener('timeupdate', function (e) {
    currentAudioElapsedTime = Math.round(e.target.currentTime);
    audioPlayer.progressBar.value = currentAudioElapsedTime.toString();
    audioPlayer.progressBar.setAttribute('aria-valuetext', currentAudioElapsedTime.toString() + ' seconds');
    progressPercent = Math.floor((currentAudioElapsedTime / currentAudioDuration) * 100);
    updateTime();
});
audioPlayer.playBtn.addEventListener('click', function () {
    audioPlayer.playOrPause("play");
    audioBars.addRemoveHover("remove");
    audio.play();
});
audioPlayer.pauseBtn.addEventListener('click', function () {
    audioBars.addRemoveHover("add");
    audioPlayer.playOrPause("pause");
    audio.pause();
});
audioPlayer.progressBar.addEventListener('input', function (e) {
    audio.currentTime = parseFloat(e.target.value);
});
volumeControl.soundBtn.addEventListener('click', function () {
    volumeControl.soundOrMute("mute");
    audio.muted = true;
    setVolumeAria(0);
});
volumeControl.muteBtn.addEventListener('click', function () {
    volumeControl.soundOrMute("sound");
    audio.muted = false;
    setVolumeAria(volumeLevel);
});
volumeControl.volumeSlider.addEventListener('input', function (e) {
    volumeLevel = parseFloat(e.target.value) / 100;
    audio.volume = volumeLevel;
    setVolumeAria(volumeLevel);
});
selectOptions.songs.addEventListener('change', function (e) {
    var id = parseInt(e.target.value);
    audio.src = songUrls[id];
    audioPlayer.playOrPause("play");
    audioBars.addRemoveHover("remove");
    audio.play();
});
selectOptions.colors.addEventListener('change', function (e) {
    var id = parseInt(e.target.value);
    for (var i = 0; i < numBars; i++) {
        bars[i].style.background = colorThemes[id][i];
    }
    firstColor = progressGradients[id][0];
    secondColor = progressGradients[id][1];
    thirdColor = progressGradients[id][2];
});
function renderBars() {
    var analyzerNode = audioInfo.analyzerNode;
    var freqDataArray = audioInfo.freqDataArray;
    if (analyzerNode && freqDataArray) {
        analyzerNode.getByteFrequencyData(freqDataArray);
        for (var i = 0; i < audioBars.numBars; i++) {
            var base = freqDataArray[(i * index) + offset];
            var backOne = freqDataArray[((i * index) + offset) - 1];
            var forwardOne = freqDataArray[((i * index) + offset) + 1];
            var averagedFreq = (backOne + base + forwardOne) / 3;
            var height = Math.max(averagedFreq, defaultBarHeight);
            bars[i].style.height = Math.round(height * barHeightMultiplier) + "px";
        }
        requestAnimationFrame(renderBars);
    }
    else {
        alert('This application is unable to run in your browser.');
    }
}
function updateTime() {
    if (!audio.ended) {
        var currentMin = Math.floor(currentAudioElapsedTime / 60);
        var currentSec = Math.floor(currentAudioElapsedTime % 60);
        if (currentSec < 10) {
            elapsedTime.innerHTML = currentMin + ':0' + currentSec;
        }
        else {
            elapsedTime.innerHTML = currentMin + ':' + currentSec;
        }
        updateProgressGradient();
    }
    else {
        elapsedTime.innerHTML = "0:00";
        audioPlayer.playOrPause("pause");
        audioBars.addRemoveHover("add");
        updateProgressGradient();
    }
}
function updateProgressGradient() {
    if (currentAudioDuration) {
        var gradient = 'linear-gradient(to right,' + firstColor + ' 0%, ' + secondColor + ',' + thirdColor + ' ' + progressPercent + '%,#ffffff ' + progressPercent + '%, #ffffff 100%)';
        progressBar.style.background = gradient;
    }
}
function setVolumeAria(volumeLevel) {
    volumeControl.volumeSlider.setAttribute('aria-valuetext', 'volume level ' + volumeLevel.toString() + ' out of 1');
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vMS8uL3NyYy9hdWRpby1jb250ZXh0LnRzIiwid2VicGFjazovLzEvLi9zcmMvYXVkaW8tcGxheWVyLnRzIiwid2VicGFjazovLzEvLi9zcmMvYmFycy50cyIsIndlYnBhY2s6Ly8xLy4vc3JjL2NvbnRyb2wtY2VudGVyLnRzIiwid2VicGFjazovLzEvLi9zcmMvc2VsZWN0LW9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vMS8uL3NyYy92b2x1bWUtY29udHJvbC50cyIsIndlYnBhY2s6Ly8xL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLzEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8xL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vMS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQXVkaW9JbmZvID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEF1ZGlvSW5mbyhhdWRpb0N0eCwgYW5hbHl6ZXJOb2RlLCBmcmVxRGF0YUFycmF5KSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb0N0eCA9IGF1ZGlvQ3R4O1xyXG4gICAgICAgIHRoaXMuYW5hbHl6ZXJOb2RlID0gYW5hbHl6ZXJOb2RlO1xyXG4gICAgICAgIHRoaXMuZnJlcURhdGFBcnJheSA9IGZyZXFEYXRhQXJyYXk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQXVkaW9JbmZvO1xyXG59KCkpO1xyXG5leHBvcnQgeyBBdWRpb0luZm8gfTtcclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUF1ZGlvQ29udGV4dChhdWRpbywgYXVkaW9JbmZvKSB7XHJcbiAgICB2YXIgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0IHx8IGZhbHNlO1xyXG4gICAgaWYgKEF1ZGlvQ29udGV4dCkge1xyXG4gICAgICAgIHZhciBhdWRpb0N0eCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcclxuICAgICAgICB2YXIgc291cmNlTm9kZSA9IGF1ZGlvQ3R4LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShhdWRpbyk7XHJcbiAgICAgICAgdmFyIGFuYWx5emVyTm9kZSA9IGF1ZGlvQ3R4LmNyZWF0ZUFuYWx5c2VyKCk7XHJcbiAgICAgICAgYW5hbHl6ZXJOb2RlLmZmdFNpemUgPSAyMDQ4O1xyXG4gICAgICAgIGFuYWx5emVyTm9kZS5zbW9vdGhpbmdUaW1lQ29uc3RhbnQgPSAwLjk7XHJcbiAgICAgICAgc291cmNlTm9kZS5jb25uZWN0KGFuYWx5emVyTm9kZSkuY29ubmVjdChhdWRpb0N0eC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgdmFyIGZyZXFBcnJheUxlbmd0aCA9IGFuYWx5emVyTm9kZS5mcmVxdWVuY3lCaW5Db3VudDtcclxuICAgICAgICB2YXIgZnJlcURhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KGZyZXFBcnJheUxlbmd0aCk7XHJcbiAgICAgICAgYW5hbHl6ZXJOb2RlLmdldEJ5dGVGcmVxdWVuY3lEYXRhKGZyZXFEYXRhQXJyYXkpO1xyXG4gICAgICAgIGF1ZGlvSW5mby5hdWRpb0N0eCA9IGF1ZGlvQ3R4O1xyXG4gICAgICAgIGF1ZGlvSW5mby5hbmFseXplck5vZGUgPSBhbmFseXplck5vZGU7XHJcbiAgICAgICAgYXVkaW9JbmZvLmZyZXFEYXRhQXJyYXkgPSBmcmVxRGF0YUFycmF5O1xyXG4gICAgICAgIHJldHVybiBbYXVkaW9DdHgsIGFuYWx5emVyTm9kZSwgZnJlcURhdGFBcnJheV07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhbGVydChcIlRoZSBXZWIgQXVkaW8gQVBJIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIEF1ZGlvUGxheWVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEF1ZGlvUGxheWVyKHBsYXlCdG4sIHBhdXNlQnRuLCBwcm9ncmVzc0Jhcikge1xyXG4gICAgICAgIHRoaXMucGxheUJ0biA9IHBsYXlCdG47XHJcbiAgICAgICAgdGhpcy5wYXVzZUJ0biA9IHBhdXNlQnRuO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIgPSBwcm9ncmVzc0JhcjtcclxuICAgIH1cclxuICAgIEF1ZGlvUGxheWVyLnByb3RvdHlwZS5zZXREdXJhdGlvbiA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgY3VycmVudER1cmF0aW9uKSB7XHJcbiAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3IoY3VycmVudER1cmF0aW9uIC8gNjApO1xyXG4gICAgICAgIHZhciBzZWMgPSBjdXJyZW50RHVyYXRpb24gJSA2MDtcclxuICAgICAgICBkdXJhdGlvbi5pbm5lckhUTUwgPSBtaW4gKyAnOicgKyBzZWM7XHJcbiAgICB9O1xyXG4gICAgQXVkaW9QbGF5ZXIucHJvdG90eXBlLnBsYXlPclBhdXNlID0gZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlID09IFwicGF1c2VcIikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBBdWRpb1BsYXllcjtcclxufSgpKTtcclxuZXhwb3J0IHsgQXVkaW9QbGF5ZXIgfTtcclxuIiwidmFyIEJhcnMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQmFycyhjb250YWluZXIsIGJhcnMsIG51bUJhcnMpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmJhcnMgPSBiYXJzO1xyXG4gICAgICAgIHRoaXMubnVtQmFycyA9IG51bUJhcnM7XHJcbiAgICB9XHJcbiAgICBCYXJzLnByb3RvdHlwZS5jcmVhdGVCYXJzID0gZnVuY3Rpb24gKGNvbG9yVGhlbWVzKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm51bUJhcnM7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiYmFyXCIgKyBpKTtcclxuICAgICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYmFyIGJhci1ob3Zlci1zdGF0ZVwiKTtcclxuICAgICAgICAgICAgYmFyLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclRoZW1lc1swXVtpXTtcclxuICAgICAgICAgICAgdGhpcy5iYXJzLnB1c2goYmFyKTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGJhcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEJhcnMucHJvdG90eXBlLmFkZFJlbW92ZUhvdmVyID0gZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlID09IFwiYWRkXCIpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm51bUJhcnM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXJzW2ldLmNsYXNzTGlzdC5hZGQoXCJiYXItaG92ZXItc3RhdGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1CYXJzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYmFyLWhvdmVyLXN0YXRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBCYXJzO1xyXG59KCkpO1xyXG5leHBvcnQgeyBCYXJzIH07XHJcbiIsInZhciBDb250cm9sQ2VudGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENvbnRyb2xDZW50ZXIoc3BsYXNoQnRuLCBjb250cm9sc0J0biwgY29udHJvbHMpIHtcclxuICAgICAgICB0aGlzLnNwbGFzaEJ0biA9IHNwbGFzaEJ0bjtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzQnRuID0gY29udHJvbHNCdG47XHJcbiAgICAgICAgdGhpcy5jb250cm9scyA9IGNvbnRyb2xzO1xyXG4gICAgfVxyXG4gICAgQ29udHJvbENlbnRlci5wcm90b3R5cGUuc2hvd09ySGlkZUNvbnRyb2xzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRyb2xzKS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sc0J0bi5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBcIjU1cHhcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHNCdG4uaW5uZXJIVE1MID0gXCJoaWRlIGNvbnRyb2xzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sc0J0bi5zdHlsZS5zZXRQcm9wZXJ0eShcInRvcFwiLCBcIjEycHhcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHNCdG4uaW5uZXJIVE1MID0gXCJzaG93IGNvbnRyb2xzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBDb250cm9sQ2VudGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBDb250cm9sQ2VudGVyIH07XHJcbiIsInZhciBTZWxlY3RPcHRpb25zID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFNlbGVjdE9wdGlvbnMoc29uZ3MsIGNvbG9ycykge1xyXG4gICAgICAgIHRoaXMuc29uZ3MgPSBzb25ncztcclxuICAgICAgICB0aGlzLmNvbG9ycyA9IGNvbG9ycztcclxuICAgIH1cclxuICAgIHJldHVybiBTZWxlY3RPcHRpb25zO1xyXG59KCkpO1xyXG5leHBvcnQgeyBTZWxlY3RPcHRpb25zIH07XHJcbiIsInZhciBWb2x1bWVDb250cm9sID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFZvbHVtZUNvbnRyb2woc291bmRCdG4sIG11dGVCdG4sIHZvbHVtZVNsaWRlcikge1xyXG4gICAgICAgIHRoaXMuc291bmRCdG4gPSBzb3VuZEJ0bjtcclxuICAgICAgICB0aGlzLm11dGVCdG4gPSBtdXRlQnRuO1xyXG4gICAgICAgIHRoaXMudm9sdW1lU2xpZGVyID0gdm9sdW1lU2xpZGVyO1xyXG4gICAgfVxyXG4gICAgVm9sdW1lQ29udHJvbC5wcm90b3R5cGUuc291bmRPck11dGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJtdXRlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRlQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRlQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gVm9sdW1lQ29udHJvbDtcclxufSgpKTtcclxuZXhwb3J0IHsgVm9sdW1lQ29udHJvbCB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNlbGVjdE9wdGlvbnMgfSBmcm9tIFwiLi9zZWxlY3Qtb3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBBdWRpb0luZm8sIGNyZWF0ZUF1ZGlvQ29udGV4dCB9IGZyb20gJy4vYXVkaW8tY29udGV4dCc7XHJcbmltcG9ydCB7IENvbnRyb2xDZW50ZXIgfSBmcm9tICcuL2NvbnRyb2wtY2VudGVyJztcclxuaW1wb3J0IHsgVm9sdW1lQ29udHJvbCB9IGZyb20gJy4vdm9sdW1lLWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBBdWRpb1BsYXllciB9IGZyb20gJy4vYXVkaW8tcGxheWVyJztcclxuaW1wb3J0IHsgQmFycyB9IGZyb20gJy4vYmFycyc7XHJcbnZhciBjb2xvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhlbWUtc2VsZWN0Jyk7XHJcbnZhciBzb25ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtcDMtc2VsZWN0Jyk7XHJcbnZhciBzb25nVXJscyA9IFsnYXNzZXRzL0lrc29uLUxhc3QtU3VtbWVyLm1wMycsICdhc3NldHMvQXJ1bG8tQmUtVGhpcy1XYXkubXAzJ107XHJcbnZhciBjb2xvclRoZW1lcyA9IFtcclxuICAgIFtcIiNGODg4OEFcIiwgXCIjRjc3RjdEXCIsIFwiI0Y3ODc3RVwiLCBcIiNGODhEN0ZcIixcclxuICAgICAgICBcIiNGODhGN0ZcIiwgXCIjRjg5NjdGXCIsIFwiI0Y5OUE4MFwiLCBcIiNGOUEzODFcIiwgXCIjRjlBNTgxXCIsIFwiI0Y5QTc4MlwiLCBcIiNGQUFDODJcIixcclxuICAgICAgICBcIiNGQUIyODNcIiwgXCIjRkFCQjgzXCIsIFwiI0ZBQkQ4NFwiLCBcIiNGQUJGODRcIiwgXCIjRkFDNTg0XCIsIFwiI0ZCQ0E4NVwiLCBcIiNGQkQzODVcIixcclxuICAgICAgICBcIiNGQUQ4ODhcIiwgXCIjRjhEOThBXCIsIFwiI0YyREU5NVwiLCBcIiNGMEUwOThcIiwgXCIjRUVFMDlBXCIsIFwiI0VDRTI5RlwiLCBcIiNFNkUwQTBcIixcclxuICAgICAgICBcIiNFNkU2QThcIiwgXCIjRTRFOEFCXCIsIFwiI0UzRUFBRVwiLCBcIiNFMEVDQjNcIiwgXCIjREJFRUI5XCIsIFwiI0Q2RjNDM1wiLCBcIiNEM0Y1QzhcIixcclxuICAgICAgICBcIiNEMkY2QzlcIiwgXCIjQ0ZGOUQwXCIsIFwiI0M2RkZERFwiXSxcclxuICAgIFtcIiMxM0MyRTlcIiwgXCIjMkZCNEU5XCIsIFwiIzNBQUZFQVwiLCBcIiM0NUFCRUFcIixcclxuICAgICAgICBcIiM0OUE5RUFcIiwgXCIjNTJBNUVBXCIsIFwiIzYxOUVFQlwiLCBcIiM2OTlCRUJcIiwgXCIjNzA5OEVCXCIsIFwiIzc2OTRFQlwiLCBcIiM4MTkwRUNcIixcclxuICAgICAgICBcIiM4NzhERUNcIiwgXCIjOTU4N0VEXCIsIFwiIzlFODNFQ1wiLCBcIiNBMzgwRUNcIiwgXCIjQjE3QUVDXCIsIFwiI0JENzRFRFwiLCBcIiNCRjczRURcIixcclxuICAgICAgICBcIiNDNTcxRURcIiwgXCIjQzc2RkU1XCIsIFwiI0M4NkVFMFwiLCBcIiNDQzZCRDVcIiwgXCIjRDI2OUM3XCIsIFwiI0QzNjdDMVwiLCBcIiNENTY2QkJcIixcclxuICAgICAgICBcIiNENzY0QjRcIiwgXCIjREE2MUFBXCIsIFwiI0RGNUU5Q1wiLCBcIiNFMTVFOTlcIiwgXCIjRTQ1QjhFXCIsIFwiI0U3NTk4NVwiLCBcIiNFQTU4N0VcIixcclxuICAgICAgICBcIiNGMTUzNjhcIiwgXCIjRjI1MjY3XCIsIFwiI0Y2NEY1OVwiXSxcclxuICAgIFtcIiM3NUVCRDZcIiwgXCIjNzdFOEQ2XCIsIFwiIzdBRTZEN1wiLCBcIiM3QkU1RDdcIixcclxuICAgICAgICBcIiM3Q0U0RDdcIiwgXCIjN0VFMUQ4XCIsIFwiIzdGRTFEOFwiLCBcIiM4MUUwRDlcIiwgXCIjODJERUQ5XCIsIFwiIzgzREREOVwiLCBcIiM4NURCREFcIixcclxuICAgICAgICBcIiM4N0RBREJcIiwgXCIjODhEOERCXCIsIFwiIzg5RDdEQlwiLCBcIiM4QUQ2REJcIiwgXCIjOEJENURDXCIsIFwiIzhDRDREQlwiLCBcIiM4RUQyRENcIixcclxuICAgICAgICBcIiM5MUQxREVcIiwgXCIjOTJDRkRFXCIsIFwiIzkzQ0VERVwiLCBcIiM5NUNDREZcIiwgXCIjOUFDOEUwXCIsIFwiIzlBQzdFMFwiLCBcIiM5QkM2RTBcIixcclxuICAgICAgICBcIiM5REM1RTFcIiwgXCIjOUVDM0UxXCIsIFwiIzlGQzFFMVwiLCBcIiNBMEMyRTJcIiwgXCIjQTNDMEUzXCIsIFwiI0E0QkVFM1wiLCBcIiNBN0JDRTRcIixcclxuICAgICAgICBcIiNBOEJBRTRcIiwgXCIjQUFCOUU1XCIsIFwiI0FDQjZFNVwiXVxyXG5dO1xyXG52YXIgc3BsYXNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGxhc2hidG5cIik7XHJcbnZhciBjb250cm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHMtd3JhcHBlclwiKTtcclxudmFyIGNvbnRyb2xzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9scy1sYWJlbFwiKTtcclxudmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpO1xyXG52YXIgYmFycyA9IFtdO1xyXG52YXIgbnVtQmFycyA9IDM1O1xyXG52YXIgZGVmYXVsdEJhckhlaWdodCA9IDg7XHJcbnZhciBiYXJIZWlnaHRNdWx0aXBsaWVyID0gMS45O1xyXG52YXIgaW5kZXggPSAxODtcclxudmFyIG9mZnNldCA9IDc1O1xyXG52YXIgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWJ0blwiKTtcclxudmFyIHBhdXNlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXVzZWJ0blwiKTtcclxudmFyIHByb2dyZXNzQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9ncmVzcy1iYXJcIik7XHJcbnZhciBwcm9ncmVzc0dyYWRpZW50cyA9IFtcclxuICAgIFtcIiNmNzc5N2RcIiwgXCIjRkJENzg2XCIsIFwiI0M2RkZERFwiXSxcclxuICAgIFtcIiMxMmMyZTlcIiwgXCIjYzQ3MWVkXCIsIFwiI2Y3Nzk3ZFwiXSxcclxuICAgIFtcIiM3NGViZDVcIiwgXCIjOGVkMmRjXCIsIFwiI0FDQjZFNVwiXVxyXG5dO1xyXG52YXIgZmlyc3RDb2xvciA9IHByb2dyZXNzR3JhZGllbnRzWzBdWzBdO1xyXG52YXIgc2Vjb25kQ29sb3IgPSBwcm9ncmVzc0dyYWRpZW50c1swXVsxXTtcclxudmFyIHRoaXJkQ29sb3IgPSBwcm9ncmVzc0dyYWRpZW50c1swXVsyXTtcclxudmFyIHByb2dyZXNzUGVyY2VudCA9IDA7XHJcbnZhciBzb3VuZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic291bmRidG5cIik7XHJcbnZhciBtdXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtdXRlYnRuXCIpO1xyXG52YXIgdm9sdW1lU2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2b2x1bWUtc2xpZGVyXCIpO1xyXG52YXIgdm9sdW1lTGV2ZWwgPSAxO1xyXG52YXIgYXVkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYXVkaW9cIik7XHJcbnZhciBkdXJhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVyYXRpb25cIik7XHJcbnZhciBlbGFwc2VkVGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWxhcHNlZC10aW1lXCIpO1xyXG52YXIgY3VycmVudEF1ZGlvRHVyYXRpb24gPSAwO1xyXG52YXIgY3VycmVudEF1ZGlvRWxhcHNlZFRpbWUgPSAwO1xyXG52YXIgYXVkaW9JbmZvID0gbmV3IEF1ZGlvSW5mbyh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcclxudmFyIGNvbnRyb2xDZW50ZXIgPSBuZXcgQ29udHJvbENlbnRlcihzcGxhc2hCdG4sIGNvbnRyb2xzQnRuLCBjb250cm9scyk7XHJcbnZhciBhdWRpb0JhcnMgPSBuZXcgQmFycyhjb250YWluZXIsIGJhcnMsIG51bUJhcnMpO1xyXG52YXIgYXVkaW9QbGF5ZXIgPSBuZXcgQXVkaW9QbGF5ZXIocGxheUJ0biwgcGF1c2VCdG4sIHByb2dyZXNzQmFyKTtcclxudmFyIHZvbHVtZUNvbnRyb2wgPSBuZXcgVm9sdW1lQ29udHJvbChzb3VuZEJ0biwgbXV0ZUJ0biwgdm9sdW1lU2xpZGVyKTtcclxudmFyIHNlbGVjdE9wdGlvbnMgPSBuZXcgU2VsZWN0T3B0aW9ucyhzb25ncywgY29sb3JzKTtcclxuYXVkaW9CYXJzLmNyZWF0ZUJhcnMoY29sb3JUaGVtZXMpO1xyXG5jb250cm9sQ2VudGVyLnNwbGFzaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnRyb2xDZW50ZXIuc3BsYXNoQnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNwbGF5LW5vbmVcIik7XHJcbiAgICBjb250cm9sQ2VudGVyLmNvbnRyb2xzQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNwbGF5LW5vbmVcIik7XHJcbiAgICBhdWRpb0JhcnMuYWRkUmVtb3ZlSG92ZXIoXCJyZW1vdmVcIik7XHJcbiAgICBhdWRpb1BsYXllci5wbGF5T3JQYXVzZShcInBsYXlcIik7XHJcbiAgICBjcmVhdGVBdWRpb0NvbnRleHQoYXVkaW8sIGF1ZGlvSW5mbyk7XHJcbiAgICBhdWRpby5wbGF5KCk7XHJcbn0pO1xyXG5jb250cm9sQ2VudGVyLmNvbnRyb2xzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY29udHJvbENlbnRlci5zaG93T3JIaWRlQ29udHJvbHMoKTtcclxufSk7XHJcbmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZW5kZXJCYXJzKCk7XHJcbn0pO1xyXG5hdWRpby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBjdXJyZW50QXVkaW9EdXJhdGlvbiA9IE1hdGguZmxvb3IoZS50YXJnZXQuZHVyYXRpb24pO1xyXG4gICAgaWYgKGF1ZGlvUGxheWVyKSB7XHJcbiAgICAgICAgYXVkaW9QbGF5ZXIuc2V0RHVyYXRpb24oZHVyYXRpb24sIGN1cnJlbnRBdWRpb0R1cmF0aW9uKTtcclxuICAgICAgICBhdWRpb1BsYXllci5wcm9ncmVzc0Jhci5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgY3VycmVudEF1ZGlvRHVyYXRpb24udG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcbn0pO1xyXG5hdWRpby5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGN1cnJlbnRBdWRpb0VsYXBzZWRUaW1lID0gTWF0aC5yb3VuZChlLnRhcmdldC5jdXJyZW50VGltZSk7XHJcbiAgICBhdWRpb1BsYXllci5wcm9ncmVzc0Jhci52YWx1ZSA9IGN1cnJlbnRBdWRpb0VsYXBzZWRUaW1lLnRvU3RyaW5nKCk7XHJcbiAgICBhdWRpb1BsYXllci5wcm9ncmVzc0Jhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0JywgY3VycmVudEF1ZGlvRWxhcHNlZFRpbWUudG9TdHJpbmcoKSArICcgc2Vjb25kcycpO1xyXG4gICAgcHJvZ3Jlc3NQZXJjZW50ID0gTWF0aC5mbG9vcigoY3VycmVudEF1ZGlvRWxhcHNlZFRpbWUgLyBjdXJyZW50QXVkaW9EdXJhdGlvbikgKiAxMDApO1xyXG4gICAgdXBkYXRlVGltZSgpO1xyXG59KTtcclxuYXVkaW9QbGF5ZXIucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGF1ZGlvUGxheWVyLnBsYXlPclBhdXNlKFwicGxheVwiKTtcclxuICAgIGF1ZGlvQmFycy5hZGRSZW1vdmVIb3ZlcihcInJlbW92ZVwiKTtcclxuICAgIGF1ZGlvLnBsYXkoKTtcclxufSk7XHJcbmF1ZGlvUGxheWVyLnBhdXNlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgYXVkaW9CYXJzLmFkZFJlbW92ZUhvdmVyKFwiYWRkXCIpO1xyXG4gICAgYXVkaW9QbGF5ZXIucGxheU9yUGF1c2UoXCJwYXVzZVwiKTtcclxuICAgIGF1ZGlvLnBhdXNlKCk7XHJcbn0pO1xyXG5hdWRpb1BsYXllci5wcm9ncmVzc0Jhci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBhdWRpby5jdXJyZW50VGltZSA9IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xyXG59KTtcclxudm9sdW1lQ29udHJvbC5zb3VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZvbHVtZUNvbnRyb2wuc291bmRPck11dGUoXCJtdXRlXCIpO1xyXG4gICAgYXVkaW8ubXV0ZWQgPSB0cnVlO1xyXG4gICAgc2V0Vm9sdW1lQXJpYSgwKTtcclxufSk7XHJcbnZvbHVtZUNvbnRyb2wubXV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZvbHVtZUNvbnRyb2wuc291bmRPck11dGUoXCJzb3VuZFwiKTtcclxuICAgIGF1ZGlvLm11dGVkID0gZmFsc2U7XHJcbiAgICBzZXRWb2x1bWVBcmlhKHZvbHVtZUxldmVsKTtcclxufSk7XHJcbnZvbHVtZUNvbnRyb2wudm9sdW1lU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHZvbHVtZUxldmVsID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgLyAxMDA7XHJcbiAgICBhdWRpby52b2x1bWUgPSB2b2x1bWVMZXZlbDtcclxuICAgIHNldFZvbHVtZUFyaWEodm9sdW1lTGV2ZWwpO1xyXG59KTtcclxuc2VsZWN0T3B0aW9ucy5zb25ncy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIGlkID0gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpO1xyXG4gICAgYXVkaW8uc3JjID0gc29uZ1VybHNbaWRdO1xyXG4gICAgYXVkaW9QbGF5ZXIucGxheU9yUGF1c2UoXCJwbGF5XCIpO1xyXG4gICAgYXVkaW9CYXJzLmFkZFJlbW92ZUhvdmVyKFwicmVtb3ZlXCIpO1xyXG4gICAgYXVkaW8ucGxheSgpO1xyXG59KTtcclxuc2VsZWN0T3B0aW9ucy5jb2xvcnMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBpZCA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQmFyczsgaSsrKSB7XHJcbiAgICAgICAgYmFyc1tpXS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JUaGVtZXNbaWRdW2ldO1xyXG4gICAgfVxyXG4gICAgZmlyc3RDb2xvciA9IHByb2dyZXNzR3JhZGllbnRzW2lkXVswXTtcclxuICAgIHNlY29uZENvbG9yID0gcHJvZ3Jlc3NHcmFkaWVudHNbaWRdWzFdO1xyXG4gICAgdGhpcmRDb2xvciA9IHByb2dyZXNzR3JhZGllbnRzW2lkXVsyXTtcclxufSk7XHJcbmZ1bmN0aW9uIHJlbmRlckJhcnMoKSB7XHJcbiAgICB2YXIgYW5hbHl6ZXJOb2RlID0gYXVkaW9JbmZvLmFuYWx5emVyTm9kZTtcclxuICAgIHZhciBmcmVxRGF0YUFycmF5ID0gYXVkaW9JbmZvLmZyZXFEYXRhQXJyYXk7XHJcbiAgICBpZiAoYW5hbHl6ZXJOb2RlICYmIGZyZXFEYXRhQXJyYXkpIHtcclxuICAgICAgICBhbmFseXplck5vZGUuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZnJlcURhdGFBcnJheSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdWRpb0JhcnMubnVtQmFyczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlID0gZnJlcURhdGFBcnJheVsoaSAqIGluZGV4KSArIG9mZnNldF07XHJcbiAgICAgICAgICAgIHZhciBiYWNrT25lID0gZnJlcURhdGFBcnJheVsoKGkgKiBpbmRleCkgKyBvZmZzZXQpIC0gMV07XHJcbiAgICAgICAgICAgIHZhciBmb3J3YXJkT25lID0gZnJlcURhdGFBcnJheVsoKGkgKiBpbmRleCkgKyBvZmZzZXQpICsgMV07XHJcbiAgICAgICAgICAgIHZhciBhdmVyYWdlZEZyZXEgPSAoYmFja09uZSArIGJhc2UgKyBmb3J3YXJkT25lKSAvIDM7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBNYXRoLm1heChhdmVyYWdlZEZyZXEsIGRlZmF1bHRCYXJIZWlnaHQpO1xyXG4gICAgICAgICAgICBiYXJzW2ldLnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICogYmFySGVpZ2h0TXVsdGlwbGllcikgKyBcInB4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJCYXJzKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdUaGlzIGFwcGxpY2F0aW9uIGlzIHVuYWJsZSB0byBydW4gaW4geW91ciBicm93c2VyLicpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZVRpbWUoKSB7XHJcbiAgICBpZiAoIWF1ZGlvLmVuZGVkKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRNaW4gPSBNYXRoLmZsb29yKGN1cnJlbnRBdWRpb0VsYXBzZWRUaW1lIC8gNjApO1xyXG4gICAgICAgIHZhciBjdXJyZW50U2VjID0gTWF0aC5mbG9vcihjdXJyZW50QXVkaW9FbGFwc2VkVGltZSAlIDYwKTtcclxuICAgICAgICBpZiAoY3VycmVudFNlYyA8IDEwKSB7XHJcbiAgICAgICAgICAgIGVsYXBzZWRUaW1lLmlubmVySFRNTCA9IGN1cnJlbnRNaW4gKyAnOjAnICsgY3VycmVudFNlYztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVsYXBzZWRUaW1lLmlubmVySFRNTCA9IGN1cnJlbnRNaW4gKyAnOicgKyBjdXJyZW50U2VjO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGVQcm9ncmVzc0dyYWRpZW50KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbGFwc2VkVGltZS5pbm5lckhUTUwgPSBcIjA6MDBcIjtcclxuICAgICAgICBhdWRpb1BsYXllci5wbGF5T3JQYXVzZShcInBhdXNlXCIpO1xyXG4gICAgICAgIGF1ZGlvQmFycy5hZGRSZW1vdmVIb3ZlcihcImFkZFwiKTtcclxuICAgICAgICB1cGRhdGVQcm9ncmVzc0dyYWRpZW50KCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3NHcmFkaWVudCgpIHtcclxuICAgIGlmIChjdXJyZW50QXVkaW9EdXJhdGlvbikge1xyXG4gICAgICAgIHZhciBncmFkaWVudCA9ICdsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsJyArIGZpcnN0Q29sb3IgKyAnIDAlLCAnICsgc2Vjb25kQ29sb3IgKyAnLCcgKyB0aGlyZENvbG9yICsgJyAnICsgcHJvZ3Jlc3NQZXJjZW50ICsgJyUsI2ZmZmZmZiAnICsgcHJvZ3Jlc3NQZXJjZW50ICsgJyUsICNmZmZmZmYgMTAwJSknO1xyXG4gICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLmJhY2tncm91bmQgPSBncmFkaWVudDtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzZXRWb2x1bWVBcmlhKHZvbHVtZUxldmVsKSB7XHJcbiAgICB2b2x1bWVDb250cm9sLnZvbHVtZVNsaWRlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0JywgJ3ZvbHVtZSBsZXZlbCAnICsgdm9sdW1lTGV2ZWwudG9TdHJpbmcoKSArICcgb3V0IG9mIDEnKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=