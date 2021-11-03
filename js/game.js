// keeping track of the colour sequence
let colourOrder = [];
// keeping track of the order the player is using
let playerOrder = [];
// number of flashes in each game
let flash;
// keep track of what turn the player is on(counter number, let turn)
let playerTurn;
// if the player is doing well or not (let good in tutorial)
let progress;
// if computers turn or players turn (let compTurn in game)
let gameTurn;
let intervalId;
// checking whether the strict toggle is switched on or off
let strictToggle = false;
// checking if power button is on or off 
let powerToggle = false;
// if playwer has won the game or not 
let win;

// font icon to change colour with every round
const icon = document.querySelector(".i.fas.fa-grin-squint")

// game counter
const roundCounter = document.querySelector("#counter");

// colour buttons
const purple = document.querySelector("#purple-button")
const orange = document.querySelector("#orange-button")
const red = document.querySelector("#red-button")
const green = document.querySelector("#green-button")

// control buttons & toggles
const power = document.querySelector("#on-button")
const strict = document.querySelector("#strict-button")
const start = document.querySelector("#start-button")


// check if strict toggle is activated
strict.addEventListener('click', (event) => {
    console.log("toggle test")
    if (strict.checked == true) {
        strictToggle = true;
    } else {
        strictToggle = false;
    }
})

// check if on power toggle is activated
power.addEventListener('click', (event) => {
    console.log("power activated")
    if (power.checked == true) {
        powerToggle = true;
        roundCounter.innerHTML = "ON"
    } else {
        powerToggle = false;
        roundCounter.innerHTML = "OFF"
        clearColor();
        clearInterval(intervalId);
    }
})