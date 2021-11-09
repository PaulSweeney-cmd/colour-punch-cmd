// keeping track of the colour sequence
let colorOrder = [];
// keeping track of the order the player is using
let playOrder = [];
// number of colour flashes in each game
let gameFlash;
// keep track of what turn the player is on
let playerTurn;
// if the player is doing well or not
let playerProgress;
// if computers turn or players turn
let compTurn;
// setting a time inteval
let intervalId;
// checking whether the strict toggle is switched on or off
let strictToggle = false;
// checking if power button is on or off
let powerToggle = false;
// if player has won the game or not
let gameWin;

let off = document.getElementById("counter");

// game counter
const roundCounter = document.querySelector("#counter");

// colour buttons
const green = document.querySelector("#green-button");
const orange = document.querySelector("#orange-button");
const red = document.querySelector("#red-button");
const blue = document.querySelector("#blue-button");

// control buttons & toggles
const power = document.querySelector("#on-button");
const strict = document.querySelector("#strict-button");
const start = document.querySelector("#start-button");
const playAgain = document.querySelector("#play-again");
const quit = document.querySelector("#quit-game");

// check if strict mode toggle is activated
strict.addEventListener("click", function(event) {
    if (strict.checked === true) {
        strictToggle = true;
        roundCounter.innerHTML = "SM";
    } else {
        strictToggle = false;
        roundCounter.innerHTML = "<strike>SM</strike>";
    }
});

// check if on power toggle is activated
power.addEventListener("click", function(event) {
    if (power.checked === true) {
        powerToggle = true;
        roundCounter.innerHTML = "READY";
    } else {
        powerToggle = false;
        counterTimeout();
        clearColor();
        // stops colour buttons from flashing if power is off
        clearInterval(intervalId);
    }
});

// display counter text when power toggle is switched off
function counterTimeout() {
    off.innerHTML = "BYE <i class='far fa-hand-paper' aria-hidden='true'></i>";
    setTimeout(function() {
        off.innerHTML = "";
    }, 1000);
}

// if start button is activated the game starts
start.addEventListener("click", function(event) {
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
    playerProgress = true;
    // looping through the game as player has to get 10 rounds to win
    for ( let i = 0; i < 10; i++ ) {
        colorOrder.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    // setting an interval of 800 milliseconds for the gameTurn function
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    powerToggle = false;
    if (gameFlash === playerTurn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        powerToggle = true;
    }
    // computer resets colours and generates a random color lasting 2 seconds
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (colorOrder[gameFlash] == 1) {
                colorOne();
            }
            if (colorOrder[gameFlash] == 2) {
                colorTwo();
            }
            if (colorOrder[gameFlash] == 3) {
                colorThree();
            }
            if (colorOrder[gameFlash] == 4) {
                colorFour();
            }
            gameFlash++;
        }, 200);
    }
}

/* functions from gameTurn are called 
and colours change in respoinse to the sequence */
function colorOne() {
    green.style.backgroundColor = "lightgreen";
}
function colorTwo() {
    red.style.backgroundColor = "lightcoral";
}
function colorThree() {
    orange.style.backgroundColor = "lightgoldenrodyellow";
}
function colorFour() {
    blue.style.backgroundColor = "lightblue";
}

// functions for font icon colour change
function iconBad() {
    let red = document.getElementById("icon");
    red.style.color = "red";
    setTimeout(function() {
        red.style.color = "black";
    }, 300);
}

function iconGood() {
    let green = document.getElementById("icon");
    green.style.color = "green";
    setTimeout(function() {
        green.style.color = "black";
    }, 300);
}

function iconReset() {
    document.getElementById("icon").style.color = "#000";
}

// function to activate modal when game is won
function winModal() {
    // Get the modal
    let modal = document.getElementById("winnerModal");
    // Get the element that closes the modal
    let play = document.getElementsByClassName("play-button")[0];
    modal.style.display = "block";
    // When the user clicks on play again close the modal
    play.onclick = function() {
    modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  };
}

function quitModal() {
    // Get the modal
    let modal = document.getElementById("winnerModal");
    // Get the element that closes the modal
    let quit = document.getElementsByClassName("quit-button")[0];
    modal.style.display = "block";
    // When the user clicks on play again close the modal
    quit.onclick = function() {
    modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  };
}

// function to change colours in play and when game is reset or restarted
function clearColor() {
    green.style.backgroundColor = "darkgreen";
    orange.style.backgroundColor = "darkorange";
    red.style.backgroundColor = "darkred";
    blue.style.backgroundColor = "darkblue";
}

// turns all colours when game has been won and function is called
function flashColor() {
    green.style.backgroundColor = "lightgreen";
    orange.style.backgroundColor = "lightgoldenrodyellow";
    red.style.backgroundColor = "lightcoral";
    blue.style.backgroundColor = "lightblue";
}

/* functions to alow user to click the highlighted colour
cross reference each function with the first to avoid comment repitition */

green.addEventListener("click", (event) => {
    /* if power is 'ON' push the color in to 
    the play order array and call the function */
    if (powerToggle) {
        playOrder.push(1);
        checkProgress();
        colorOne();
        // if player hasn't won game revert colour back to default
        if(!gameWin) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }   
    }
});

orange.addEventListener("click", (event) => {
    if (powerToggle) {
        playOrder.push(3);
        checkProgress();
        colorThree();
        if(!gameWin) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }   
    }
});

red.addEventListener("click", (event) => {
    if (powerToggle) {
        playOrder.push(2);
        checkProgress();
        colorTwo();
        if(!gameWin) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }   
    }
});

blue.addEventListener("click", (event) => {
    if (powerToggle) {
        playOrder.push(4);
        checkProgress();
        colorFour();
        if(!gameWin) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }   
    }
});

// checking progress of current game
function checkProgress() {
    // checking to see if the player and game are at an equal level
    if (playOrder[playOrder.length - 1] !== colorOrder[playOrder.length - 1]) {
        playerProgress = false;
    }
    // if the player has scored ten points, the winGame function is called
    if (playOrder.length == 10 && playerProgress) {
        playerWin();
    }
    /* if the players progress isn't good, a function is called and game 
       counter displays text and ICON function is called */
    if (playerProgress == false) {
        flashColor();
        iconBad();
        roundCounter.innerHTML = "<i class='far fa-thumbs-down' aria-hidden='true'></i>";
        /* after the error has happened the counter goes back 
        to the current round and the clearColor function is called */
        setTimeout(() => {
            roundCounter.innerHTML = playerTurn;
            clearColor();
            /* if STRICT MODE is switched on the game 
            automatically resets back to the beginning */
            if (strictToggle) {
                playGame();
            // if STRICT MODE is switched off the game resumes
            } else {
                compTurn = true;
                gameFlash = 0;
                playOrder = [];
                playerProgress = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
    }
    /* function to call the icon function and move 
    on to the next round and if player scored correctly */
    nextRound();

    function nextRound() {
        if (playerTurn == playOrder.length && playerProgress && !gameWin) {
            playerTurn++;
            playOrder = [];
            compTurn = true;
            gameFlash = 0;
            iconGood();
            roundCounter.innerHTML = "<i class='far fa-thumbs-up' aria-hidden='true'></i>";
            setTimeout(() => {
                roundCounter.innerHTML = playerTurn;
            }, 800)
            intervalId = setInterval(gameTurn, 800);
        }
    }
}

/* function to call when all rounds have been won, 
calls the flashColor function when player reached ten rounds */
function playerWin() {
    flashColor();
    winModal();
    quitModal();
    powerToggle = false;
    gameWin = true;
    roundCounter.innerHTML = "10/10";
}

/* calls the playGame function to reset the variables 
when player clicks new game button */
playAgain.addEventListener('click', newGame);
function newGame(event) {
    playGame();
    clearColor();
    iconReset();
}

// clear the game when quit button is clicked
quit.addEventListener('click', quitGame);
function quitGame(event) {
    clearColor();
    roundCounter.innerHTML = "READY";
}
