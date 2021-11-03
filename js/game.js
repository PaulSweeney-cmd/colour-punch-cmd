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

// game counter
const counter = document.querySelector("#counter");

// game buttons
const purple = document.querySelector("#purple-button")
const orange = document.querySelector("#orange-button")
const red = document.querySelector("#red-button")
const green = document.querySelector("#green-button")

// buttons
const powerButton = document.querySelector("#on-button")
const strictButton = document.querySelector("#strict-button")
const start = document.querySelector("#start-button")

// check if strict toggle is activated
strictButton.addEventListener('click', (event) => {
    console.log("toggle test")
    if (strictButton.checked == true) {
        strictToggle = true;
    } else {
        strictToggle = false;
    }
})
