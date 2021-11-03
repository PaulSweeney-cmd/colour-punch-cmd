// keeping track of the colour sequence
let colourOrder = [];
// keeping track of the order the player is using
let playOrder = [];
// number of flashes in each game
let gameFlash;
// keep track of what turn the player is on(counter number, let turn)
let playerTurn;
// if the player is doing well or not (let good in tutorial)
let progress;
// if computers turn or players turn
let compTurn;
// setting a time inteval
let intervalId;
// checking whether the strict toggle is switched on or off
let strictToggle = false;
// checking if power button is on or off 
let powerToggle = false;
// if playwer has won the game or not 
let gameWin;

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

// check if strict mode toggle is activated
strict.addEventListener('click', (event) => {
    console.log("toggle test")
    if (strict.checked == true) {
        strictToggle = true;
    } else {
        strictToggle = false;
    }
});

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
        // stops colour buttions from flashing if power is off
        clearInterval(intervalId);
    }
});

// if start button is activated the game starts
start.addEventListener('click', (event) => {
    if (powerToggle || winGame) {
        playGame();
    }
});

// resetting the variables when player starts a new game
function playGame() {
    gameWin = false;
    colourOrder = [];
    playOrder = [];
    gameFlash = 0;
    intervalId = 0;
    playerTurn = 1;
    roundCounter.innerHTML = 1;
    progress = true;
    // looping through the game 10 times as player has to get 10 rounds to win
    for (var i = 0; i < 10; i++) {
        playOrder.push(Math.floor(Math.random() * 4) + 1);
        console.log(playOrder);
    }
    compTurn = true;
    // setting an interval of 900 milliseconds for the gameTurn function
    interval = setInterval(gameTurn, 900);
}