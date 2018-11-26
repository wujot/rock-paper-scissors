'use strict';

// Variables
var rounds = 0;
var turn;
var yourTurn;
var computerTurn;
var pointsPlayer = 0;
var pointsComputer = 0;
var finishRound = false;

// Assign HTML elemets into variables
var output = document.getElementById('output');
var result = document.getElementById('result');
var winRounds = document.getElementById('winRounds');
var buttonRock = document.getElementById('rockButton');
var buttonPaper = document.getElementById('paperButton');
var buttonScissors = document.getElementById('scissorsButton');
var buttonNewGame = document.getElementById('newGame');

// Random Generator function
var random = function(min, max) {
	return Math.floor((Math.random() * 3) + 1);
}

// Validate Turn function
var validateTurn = function(number) {

	var turn;

	if (number == 1) {
		turn = 'ROCK';
	} else if(number == 2) {
		turn = 'PAPER';
	} else {
		turn = 'SCISSORS';
	}

	return turn;
}

// Evaluate result
var isWin = function(yourTurn, computerTurn) {

	if (yourTurn == 'ROCK') {
		if (computerTurn == 'PAPER') {
			return false;
		}else if (computerTurn == 'SCISSORS') {
			return true;
		}else 
			return null;
	}else if (yourTurn == 'PAPER') {
		if (computerTurn == 'ROCK') {
			return true;
		}else if (computerTurn == 'SCISSORS') {
			return false;
		}else 
			return null;
	}else {
		if (computerTurn == 'ROCK') {
			return false;
		}else if (computerTurn == 'PAPER') {
			return true;
		}else
			return null;
	}

}

// Validate result
var resultMessage = function(isWin) {

	var message;

	if (isWin == true) {
		message = 'YOU WON';
		pointsPlayer += 1;
	}else if (isWin == false) {
		message = 'YOU LOSE';
		pointsComputer += 1;
	}else {
		message = 'DRAW';
	}
	return message;
}


// Points counter
var pointsCounter = function(round) {

	if (round == 'WON') {
		pointsPlayer += 1;
	}else if (round == 'LOSE') {
		pointsComputer += 1;
	}else {

	}
}

// Print round
var printRound = function(turnp, turnc) {

	var round = isWin(validateTurn(turnp), validateTurn(turnc));

	return output.innerHTML = '<h2>' + resultMessage(round) + '</h2><br><h3> You played ' + '<strong>' + validateTurn(turnp) + '</strong>' + '<br>' + 'Computer played ' + '<strong>' + validateTurn(turnc) + '</strong>' + '</h3>';
}

// Print game
var printGame = function() {
	return result.innerHTML ='<h1>Player ' + pointsPlayer + ' / ' + pointsComputer + ' Computer</h1>';
}

// Print rounds
var printRounds = function(rounds) {
	return winRounds.innerHTML = '<h1>' + '<span>' + rounds + '</span>' + ' points to win the game !' + '</h1>';
}

// Clear play board
var clearRound = function() {
	return output.innerHTML = '<h2>' + '</h2>';
}

// Clear play board
var clearGame = function() {
	return result.innerHTML = '<h2>' + '</h2>';
}

// Player move function
var playerMove = function(playerTurn) {

	if (finishRound == false) {
		playerTurn = playerTurn;
		computerTurn = random(1, 3);

		won(pointsPlayer, pointsComputer, rounds);

		printRound(playerTurn, computerTurn);
		printGame();
	}else
		return false;
}

// Function on button click
buttonRock.addEventListener('click', function(){
	turn = 1;

	if (canPlay(rounds) == true) {
		playerMove(turn);
	} else 
		return false;
	
}); 

// Function on button click
buttonPaper.addEventListener('click', function(){
	turn = 2;

	if (canPlay(rounds) == true) {
		playerMove(turn);
	} else 
		return false;
	
}); 

// Function on button click
buttonScissors.addEventListener('click', function(){
	turn = 3;

	if (canPlay(rounds) == true) {
		playerMove(turn);
	} else 
		return false;
}); 

// New Game
buttonNewGame.addEventListener('click', function(){
	
	// Prompt window
	rounds = window.prompt('Type number of points to win the game:');

	printRounds(rounds);

	// Set New Game
	finishRound = false;
	pointsPlayer = 0;
	pointsComputer = 0;

	clearRound();
	clearGame();
	
}); 

// Validate game 
var canPlay = function(rounds) {
	if (rounds < 1) {
		return false;
	}else 
		return true;
}

// Won
var won = function(pointsPlayer, pointsComputer, rounds) {
	if (pointsPlayer == rounds) {
		rounds = 0;
		finishRound = true;
		return winRounds.innerHTML = '<h1>' + 'You won the game !' + '</h1>' + '<br>' + '<h1>Game Over. Click New Game button to play !</h1>';
	}else if (pointsComputer == rounds) {
		rounds = 0;
		finishRound = true;
		return winRounds.innerHTML = '<h1>' + 'Computer won the game !' + '</h1>' + '<br>' + '<h1>Game Over. Click New Game button to play !</h1>';
	}
} 