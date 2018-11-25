'use strict';

// Variables
var turn;
var yourTurn;
var computerTurn;
var pointsPlayer = 0;
var pointsComputer = 0;

// Assign HTML elemets into variables
var output = document.getElementById('output');
var result = document.getElementById('result');
var buttonRock = document.getElementById('rockButton');
var buttonPaper = document.getElementById('paperButton');
var buttonScissors = document.getElementById('scissorsButton');

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

	return output.innerHTML = '<h2>' + resultMessage(round) + '</h2<br><h3> You played ' + '<strong>' + validateTurn(turnp) + '</strong>' + '<br>' + 'Computer played ' + '<strong>' + validateTurn(turnc) + '</strong>' + '</h3>';
}

// Print game
var printGame = function() {
	return result.innerHTML ='<h1>Player ' + pointsPlayer + ' / ' + pointsComputer + ' Computer</h1>';
}


// Player move function
var playerMove = function(playerTurn) {

	playerTurn = playerTurn;
	computerTurn = random(1, 3);

	printRound(playerTurn, computerTurn);
	printGame();

}

// Function on button click
buttonRock.addEventListener('click', function(){
	turn = 1;

	playerMove(turn);
	
}); 

// Function on button click
buttonPaper.addEventListener('click', function(){
	turn = 2;

	playerMove(turn);
	
}); 

// Function on button click
buttonScissors.addEventListener('click', function(){
	turn = 3;

	playerMove(turn);
	
}); 