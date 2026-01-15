var isplaying = 0;
const label_bpm_div = document.getElementById("label-bpm");
let number_bpm_span = document.getElementById("number-bpm");
const bezeichnung_bpm_italienisch_div = document.getElementById("bezeichnung-bpm-italienisch");
let slider_bpm_input = document.getElementById("slider-bpm");
const schläge_label_div = document.getElementById("schläge-label");
const schläge_punkte_div = document.getElementById("schläge-punkte");
const playpause_button_div = document.getElementById("playpause-button");
const play_button_img = document.getElementById("play-img");
const pause_button_img = document.getElementById("pause-img");
const erster_beat_div = document.getElementById("erster-beat");


//check if annyang could be loaded
/*if(annyang) {
    console.log("annyang works")
}*/

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
    isplaying = 1;
    changeVisibility();
    console.log("start");
}

function stop_playing() {
    isplaying = 0;
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
    if (isplaying == 1) {
        pause_button_img.style.visibility = 'visible';
        play_button_img.style.visibility = 'hidden';
    }
    else {
        pause_button_img.style.visibility = 'hidden';
        play_button_img.style.visibility = 'visible';
    }
}
changeVisibility();

//start/stop playing when button is pressed
pause_button_img.addEventListener('click', function() {
    stop_playing();
})
play_button_img.addEventListener('click', function() {
    start_playing();
})

//add commands
/*annyang.addCommands(commands);

//start listening
annyang.start();
*/

//number-bpm an slider anpassen
number_bpm_span.innerHTML = slider_bpm_input.value;
slider_bpm_input.oninput = function () {
    number_bpm_span.innerHTML = this.value;
    bezeichnung_bpm_italienisch_div.innerHTML = get_italian();
}

function main () {}