// keeping track of the colour sequence
let colorOrder = [];
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
const green = document.querySelector("#green-button")
const orange = document.querySelector("#orange-button")
const red = document.querySelector("#red-button")
const blue = document.querySelector("#blue-button")

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
        // stops colour buttons from flashing if power is off
        clearInterval(intervalId);
    }
});

// if start button is activated the game starts
start.addEventListener('click', (event) => {
    if (powerToggle || gameWin) {
        playGame();
    }
});

// resetting the variables when player starts a new game
function playGame() {
    gameWin = false;
    colorOrder = [];
    playOrder = [];
    gameFlash = 0;
    intervalId = 0;
    playerTurn = 1;
    roundCounter.innerHTML = 1;
    progress = true;
    // looping through the game 10 times as player has to get 10 rounds to win
    for (var i = 0; i < 10; i++) {
        playOrder.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    // setting an interval of 900 milliseconds for the gameTurn function
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    powerToggle = false;
    if (gameFlash == playerTurn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        powerToggle = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (colorOrder[gameFlash] == 1) one();
            if (colorOrder[gameFlash] == 2) two();
            if (colorOrder[gameFlash] == 3) three();
            if (colorOrder[gameFlash] == 4) four();
            gameFlash++;
        }, 200);
    }
}

function one() {
    green.style.backgroundColor = "lightgreen";
}
function two() {
    orange.style.backgroundColor = "tomato";
}
function three() {
    red.style.backgroundColor = "yellow";
}
function four() {
    blue.style.backgroundColor = "lightskyblue";
}

function clearColor() {
    green.style.backgroundColor = "darkgreen";
    orange.style.backgroundColor = "darkorange";
    red.style.backgroundColor = "darkred";
    blue.style.backgroundColor = "darkblue";
}

green.addEventListener('click', (event) => {
    if (powerToggle) {
        playOrder.push(1);
        // checkCorrect();
        one();
        if(!gameWin) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }   
    }
})