<h1 align="center">Audio Visualizer</h1>
<p align="center">A visually engaging simulation that represents audio signals through vibrant vertical bars, with each bar's height corresponding to the intensity of a specific frequency as the audio is played.</p>
<p align="center"><a href="https://audio-frequency-visualizer.netlify.app/">Live Demo</a></p>
<br>

## Features
### Start Screen 
![Start Screen](./read-me-images/start-screen.png)
* Application sound playback initializes with a play button.
* This is to meet the Chrome Autoplay policy which the Web Audio API enforces: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes

### Audio Bars
![Audio Bars](./read-me-images/audio-bars.png)
* The audio bars represent frequencies of the current audio source, from low frequencies to high frequencies going left to right. 
* The height of the bars indicate the strength of frequency. 
* The Web Audio API context node system was used to pull out the audio frequency data at a specific moment in time. 
* A renderBars() function continually fetches audio frequency data, simulating the audio bars to move with the beat of the music. 
* A flow chart outlining the general logic behind the audio bar functionality is shown below: 
![Audio Bars Flowchart](./read-me-images/flow-chart.jpg)

### Audio Player Controls
![Audio Controls](./read-me-images/audio-player.png)
* The current MP3 audio can be paused, played, and the user can skip around to different time stamps.
* The total length of the song and its current time stamp is displayed. 
### Volume Control 
<p>
<img src="/read-me-images/volume-unmute.png" width="150" /> 
<img src="/read-me-images/volume-mute.png" width="150" />
</p>

* The current MP3 audio can be muted, unmuted, or volume adjusted. 

### MP3 Selection 
![MP3 Selection](./read-me-images/mp3-selection.png)
* There are 2 MP3 selections. 
### Color Theme Selection 
![Colot Theme Selection](./read-me-images/color-selection.png)
* There are 3 gradient color theme selections, that will apply to the audio bars and audio player controls. 
