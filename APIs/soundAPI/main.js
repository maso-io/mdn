const container = document.querySelector(".container");
const volume = document.querySelector("#volume");
const pan = document.querySelector("#pan");
const btn = document.querySelector("button");

//const AudioContext = (AudioContext || webkitAudioContext);      // for compatibility we check if the page we are loading uses AudioContext and if not we use webkit
const audioCtx = new AudioContext();                            // creates a new audio context
audioElement = new Audio('chop.wav');
audioElement.controls = false;
container.appendChild(audioElement);
const audioSrc = audioCtx.createMediaElementSource(audioElement);   // sets the audio source for our audio context 

btn.addEventListener("click", () => {
    // check if context if in suspended state (autoplay policy)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    if (btn.getAttribute('class') === 'pause') {
        audioElement.play();
        btn.setAttribute('class', 'playing');
        btn.textContent = 'PAUSE';
    }
    else if (btn.getAttribute('class') === 'playing') {
        audioElement.pause();
        btn.setAttribute('class', 'pause');
        btn.textContent = 'PLAY';
    }
});

// check if the song has finished playing on its own
audioElement.addEventListener('ended', () => {
    btn.setAttribute('class', 'pause');
    btn.textContent = 'PLAY';
});

// create a gain node of the audio graph to adjust volume (gain)
const gainNode = audioCtx.createGain();
volume.addEventListener('input', () => {
    gainNode.gain.value = volume.value;
}, false)

// create an analyser node to exctract and visualize freequency data
const analyser = audioCtx.createAnalyser();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const height = (canvas.height = 350);
const width = (canvas.width = 600);

function visualize() {
    let barY;
    let barX;
    let startX

    startX = 0;
    analyser.fftSize = 64;
    bufferLenght = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLenght);
    analyser.getByteFrequencyData(frequencyData);
    barX = Math.floor(width / frequencyData.length) - 2;
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = randomRGB();
    for (i = 0; i < frequencyData.length; i++) {
        barY = frequencyData[i];
        ctx.fillRect(startX, height - barY, barX, barY);
        startX = (startX + barX + 2);       // move start position to nxt bar width, with a gap of 2
    }

    // create an animation loop to draw new bars on every new update
    requestAnimationFrame(visualize);
}


audioSrc.connect(gainNode).connect(analyser).connect(audioCtx.destination);
visualize();

// helper functions
function ranInt() {
    // generate a random number between 0 and 255
    return (Math.floor(Math.random() * 255) + 1);
}
function randomRGB() {
    // generate a random color
    return `rgb(${ranInt()},${ranInt()},${ranInt()})`;
}