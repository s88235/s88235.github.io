import Timer from './timer.js';

var isPlaying = 0;
var isListening = 1;
var firstBeat = 1;
var isVisibleSprachbefehle = 0;
var schlägeZähler = 4;
var zähler = 0;
var bpm = 10;
var lautstärke = 0.5;

const label_bpm_div = document.getElementById("label-bpm");
let number_bpm_span = document.getElementById("number-bpm");
const bezeichnung_bpm_italienisch_div = document.getElementById("bezeichnung-bpm-italienisch");
let slider_bpm_input = document.getElementById("slider-bpm");

const playpause_button_div = document.getElementById("playpause-button");
const play_button_img = document.getElementById("play-img");
const pause_button_img = document.getElementById("pause-img");

const minus_schläge_button = document.getElementById("minus-schläge-button");
const plus_schläge_button = document.getElementById("plus-schläge-button");
const number_schläge_span = document.getElementById("number-schläge");

const erster_beat_input = document.getElementById("erster-beat");
const spracheingabe_input = document.getElementById("spracheingabe");

const github_link = document.getElementById("link-github");
const öffnen_sprachbefehle_label = document.getElementById("öffnen-sprachbefehle");

const overlay_div = document.getElementById("overlay");
const close_btn_button = document.getElementById("close-btn");
const popup_sprachbefehle_div = document.getElementById("popup-sprachbefehle");

const soundHigh = new Audio ('sounds/MetronomeSoundHighLouder.mp3');
const soundLow = new Audio ('sounds/MetronomeSoundLowLouder.mp3');

//check if annyang could be loaded
if(annyang) {
    console.log("annyang works")
}  

//command Liste
var commands = {
    'Start' : start_playing,
    'los' : start_playing,
    'an' : start_playing,
    'Stop' : stop_playing,
    'aus' : stop_playing,
    'Pause' : stop_playing,

    'lauter' : lauter,
    'Lautstärke hoch' : lauter,
    'leiser' : leiser,
    'Lautstärke runter' : leiser,

    'schneller' : schneller,
    /* 'Tempo hoch' : schneller, */
    'langsamer' : langsamer,
    /* 'Tempo runter' : langsamer, */

    'Tempo *bpm' : setBPM
}

//functions

//Lautstärke
function set_volume (newVolume) {
    if (newVolume > 1 && newVolume <= 100) {
        newVolume = newVolume / 100;
    }
    if (newVolume >= 0 && newVolume <= 1) {
        lautstärke = newVolume;
        soundHigh.volume = lautstärke;
        soundLow.volume = lautstärke;
    }
    else {
        console.log('invalid volume')
    }
}
set_volume(lautstärke);

function lauter() {
    if (lautstärke + 0.2 > 1) {
        lautstärke = 1;
        set_volume(lautstärke);
    }
    else {
        lautstärke = lautstärke + 0.2;
        set_volume(lautstärke);
    }
}
function leiser() {
    if (lautstärke - 0.2 < 0) {
        lautstärke = 0;
        set_volume(lautstärke);
    }
    else {
        lautstärke = lautstärke - 0.2;
        set_volume(lautstärke);
    }
}

//bpm ändern
function setBPM(newBPM) {
    bpm = Number(newBPM);
    console.log('setBPM: ', bpm);
    timer.timeInterval = 60000 / bpm;
    number_bpm_span.innerHTML = bpm;
    slider_bpm_input.value = bpm;
    bezeichnung_bpm_italienisch_div.innerHTML = get_italian();
}

function schneller() {
    console.log('schneller bpm:',bpm + 30);
    if (bpm + 30 > 220) {
        bpm = 220;
        setBPM(bpm);
    }
    else {
        bpm = bpm + 30;
        setBPM(bpm);
    }
}
function langsamer() {
    if (bpm - 30 < 1) {
        bpm = 1;
        setBPM(bpm);
    }
    else {
        bpm = bpm - 30;
        setBPM(bpm);
    }
}

//Timer funktion (funktion, interval, startet mit Funktion statt warten
const timer = new Timer(play_sound, 60000/bpm, {immediate: true})

function play_sound () {
    if (firstBeat == 1) {
        if (zähler == schlägeZähler) {
            zähler = 0;
        }
        if (zähler == 0) {
            soundHigh.play();
            soundHigh.currentTime = 0;
        }
        else {
            soundLow.play();
            soundLow.currentTime = 0;
        }
        zähler++;
    }
    else {
        soundLow.play();
        soundLow.currentTime = 0;
    }
}

function start_playing() {
    zähler = 0;
    isPlaying = 1;
    changeVisibilityPlayPauseButton();
    console.log("start");
    timer.start();
}

function stop_playing() {
    isPlaying = 0;
    changeVisibilityPlayPauseButton();
    console.log("stop");
    timer.stop();
}

function get_italian() {
    var italian;
    if (slider_bpm_input.value <= 24) {
        italian = 'Larghissimo';
    }
    else if (slider_bpm_input.value >= 25 && slider_bpm_input.value <= 40) {
        italian = 'Grave';
    }
    else if (slider_bpm_input.value >= 40 && slider_bpm_input.value < 60) {
        italian = 'Lento/Largo';
    }
    else if (slider_bpm_input.value >= 60 && slider_bpm_input.value < 66) {
        italian = 'Larghetto';
    }
    else if (slider_bpm_input.value >= 66 && slider_bpm_input.value < 76) {
        italian = 'Adagio';
    }
    else if (slider_bpm_input.value >= 76 && slider_bpm_input.value < 108) {
        italian = 'Andante';
    }
    else if (slider_bpm_input.value >= 108 && slider_bpm_input.value < 120) {
        italian = 'Moderato';
    }
    else if (slider_bpm_input.value >= 120 && slider_bpm_input.value < 140) {
        italian = 'Allegro';
    }
    else if (slider_bpm_input.value >= 140 && slider_bpm_input.value < 168) {
        italian = 'Vivace';
    }
    else if (slider_bpm_input.value >= 168 && slider_bpm_input.value < 199) {
        italian = 'Presto';
    }
    else if (slider_bpm_input.value >= 200) {
        italian = 'Prestissimo';
    } 
    return italian;
}

function changeVisibilityPlayPauseButton() {
    if (isPlaying == 1) {
        pause_button_img.style.visibility = 'visible';
        play_button_img.style.visibility = 'hidden';
    }
    else {
        pause_button_img.style.visibility = 'hidden';
        play_button_img.style.visibility = 'visible';
    }
}
changeVisibilityPlayPauseButton();

function changeVisibilitySprachbefehlePopup() {
    if (isVisibleSprachbefehle == 1) {
        popup_sprachbefehle_div.style.visibility = 'visible';
    }
    else {
        popup_sprachbefehle_div.style.visibility = 'hidden';
    }
}
changeVisibilitySprachbefehlePopup();



//Sprache auf deutsch schalten
annyang.setLanguage('de');

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

//Schläge Zähler
minus_schläge_button.addEventListener('click', function() {
    if (schlägeZähler <= 1) {
        return;
    }
    else {
        schlägeZähler--;
        number_schläge_span.innerText = schlägeZähler;
    }
})
plus_schläge_button.addEventListener('click', function() {
    if (schlägeZähler >= 12) {
        return;
    }
    else {
        schlägeZähler++;
        number_schläge_span.innerText = schlägeZähler;
    }
})

//soll spracheingabe verwendet werden? -> annyang.start/stop
spracheingabe_input.addEventListener('change', function() {
    if (isListening == 1) {
        annyang.pause();  
        isListening = 0;
        console.log(isListening);
    }
    else {
        annyang.start();
        isListening = 1;
        console.log(isListening);
    }
})

//soll der erste beat hervorgehoben werden?
erster_beat_input.addEventListener('change', function () {
    if (firstBeat == 0) {
        firstBeat = 1;
        console.log(firstBeat);
    }
    else {
        firstBeat = 0;
        console.log(firstBeat);
    }
})
//popup fenster
öffnen_sprachbefehle_label.addEventListener('click', function(){
    isVisibleSprachbefehle = 1;
    changeVisibilitySprachbefehlePopup();
})
close_btn_button.addEventListener('click', function(){
    isVisibleSprachbefehle = 0;
    changeVisibilitySprachbefehlePopup();
})

//number-bpm an slider anpassen
number_bpm_span.innerHTML = slider_bpm_input.value;
slider_bpm_input.addEventListener('input', function () {
    number_bpm_span.innerHTML = slider_bpm_input.value;
    bpm = slider_bpm_input.value;
    timer.timeInterval = 60000 / bpm;
    bezeichnung_bpm_italienisch_div.innerHTML = get_italian();
})
