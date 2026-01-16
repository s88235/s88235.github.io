var isPlaying = 0;
var isListening = 1;
var firstBeatNormal = 0;
const label_bpm_div = document.getElementById("label-bpm");
let number_bpm_span = document.getElementById("number-bpm");
const bezeichnung_bpm_italienisch_div = document.getElementById("bezeichnung-bpm-italienisch");
let slider_bpm_input = document.getElementById("slider-bpm");
const playpause_button_div = document.getElementById("playpause-button");
const play_button_img = document.getElementById("play-img");
const pause_button_img = document.getElementById("pause-img");
const erster_beat_input = document.getElementById("erster-beat");
const spracheingabe_input = document.getElementById("spracheingabe");


//check if annyang could be loaded
if(annyang) {
    console.log("annyang works")
}

//command Liste
var commands = {
    'Metronom an' : start_playing,
    'Metronom go' : start_playing,
    'Metronom start' : start_playing,
    'start' : start_playing,
    'go' : start_playing,
    'Metronom aus' : stop_playing,
    'Metronom stop' : stop_playing,
    'Metronom stopp' : stop_playing,
    'stop' : stop_playing,
    'stopp' : stop_playing
}

//functions
function start_playing() {
    isPlaying = 1;
    changeVisibility();
    console.log("start");
}

function stop_playing() {
    isPlaying = 0;
    changeVisibility();
    console.log("stop");
}

function get_italian() {
    var italian;
    if (slider_bpm_input.value <= 24) {
        italian = 'Larghissimo'
    }
    else if (slider_bpm_input.value >= 25 && slider_bpm_input.value <= 40) {
        italian = 'Grave'
    }
    else if (slider_bpm_input.value >= 40 && slider_bpm_input.value <= 60) {
        italian = 'Largo'
    }
    /*else if (slider_bpm_input.value >=  && slider_bpm_input.value <=) {
        italian = ''                                      <---------------------------------------------bitte noch vervollständigen Amelie i'm confused*/
    return italian;
}

function changeVisibility() {
    if (isPlaying == 1) {
        pause_button_img.style.visibility = 'visible';
        play_button_img.style.visibility = 'hidden';
    }
    else {
        pause_button_img.style.visibility = 'hidden';
        play_button_img.style.visibility = 'visible';
    }
}
changeVisibility();

//add commands
annyang.addCommands(commands);

//start listening
annyang.start();

//EventListener

//start/stop playing when button is pressed
pause_button_img.addEventListener('click', function() {
    stop_playing();
})
play_button_img.addEventListener('click', function() {
    start_playing();
})

//soll spracheingabe verwendet werden? -> annyang.start/stop
spracheingabe_input.addEventListener('change', function() {
    if (isListening == 1) {
        //annyang.stop();
        isListening = 0;
        console.log(isListening);
    }
    else {
        //annyang.start();
        islistening = 1;
        console.log(isListening);
    }
})

//soll der erste beat hervorgehoben werden?
erster_beat_input.addEventListener('change', function () {
    if (firstBeatNormal == 0) {
        firstBeatNormal = 1;
        console.log(firstBeatNormal);
    }
    else {
        firstBeatNormal = 0;
        console.log(firstBeatNormal);
    }
})

//number-bpm an slider anpassen
number_bpm_span.innerHTML = slider_bpm_input.value;
slider_bpm_input.oninput = function () {
    number_bpm_span.innerHTML = this.value;
    bezeichnung_bpm_italienisch_div.innerHTML = get_italian();
}

function main () {}