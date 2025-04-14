'use strict';

// Function to roll the dice
function roll(){
    return Math.trunc(Math.random() * 6) + 1;
}

// function to switch the Player
function switchPlayer(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    player1El.classList.toggle("player--active");
    player2El.classList.toggle("player--active");
    activePlayer = activePlayer === 0 ? 1 : 0;

}

let rollDice = document.querySelector(".btn--roll");
let hold = document.querySelector(".btn--hold");
let newGame = document.querySelector(".btn--new");
let audio1, audio2, activePlayer, totalScore, currentScore, playing, player1TotalScore, player2TotalScore, player1El, player2El, dicePic, currscoE1, currscoE2;

function init(){
    activePlayer = 0;
    totalScore = [0, 0];
    currentScore = 0;
    playing = true;
    player1TotalScore = document.getElementById("score--0");
    player2TotalScore = document.getElementById("score--1");
    player1El = document.querySelector(".player--0");
    player2El = document.querySelector(".player--1");
    dicePic = document.querySelector(".dice");
    currscoE1 = document.getElementById("current--0");
    currscoE2 = document.getElementById("current--1"); 
    audio1 = document.getElementById("stage");
    audio2 = document.getElementById("winning");
    audio1.pause();
    audio2.pause();
    audio1.currentTime = 0;
    audio2.currentTime = 0;


    // Intial Conditions---
    player1TotalScore.textContent = 0;
    player2TotalScore.textContent = 0;
    dicePic.classList.add("hidden");
    player1El.classList.add("player--active");
    player2El.classList.remove("player--active");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    }

init();





// Clicking the roll button
rollDice.addEventListener("click", function(){
    if(playing){
        audio1.play();
        let dice = roll();
        // Display the dice
        dicePic.classList.remove("hidden");
        dicePic.src = `dice-${dice}.png`;
        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
    else{
        switchPlayer();
     
        }
    }
});

hold.addEventListener("click", function(){
    if(playing){
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer];
    if(totalScore[activePlayer] >= 100){
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        dicePic.classList.add("hidden");
        audio1.pause();
        audio2.play();
        playing = false;
    }
    else switchPlayer();
    
    }
});

newGame.addEventListener("click", function(){
    init();
    
})
