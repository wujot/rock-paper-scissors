'use strict';

// Variables
var turn;
var yourTurn;
var computerTurn;

// Assign HTML elemets into variables
var output = document.getElementById('output');
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
var result = function(isWin) {

	var message;

	if (isWin == true) {
		message = 'YOU WON';
	}else if (isWin == false) {
		message = 'YOU LOSE';
	}else {
		message = 'DRAW';
	}
	return message;
}

// Print result
var print = function(turnp, turnc) {

	var round = isWin(validateTurn(turnp), validateTurn(turnc));

	return output.innerHTML = result(round) + '<br> You played ' + validateTurn(turnp) + ', Computer played ' + validateTurn(turnc) + '<br><br>' + output.innerHTML;
}

// Player move function
var playerMove = function(playerTurn) {

	playerTurn = playerTurn;
	computerTurn = random(1, 3);

	return print(playerTurn, computerTurn);

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