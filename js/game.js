'use strict';
(function(){ 

// Objects
var params = {
	rounds: 0,
	round: 0,
	turn: 0,
	pointsPlayer: 0,
	pointsComputer: 0,
	finishRound: false,
	yourTurn: 0,
    computerTurn: 0,
    progress: []
}

// Assign HTML elemets into variables
var output = document.getElementById('output');
var result = document.getElementById('result');
var tableRow = document.getElementById('tableRow');
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

	if (number == 1) {
		return 'ROCK';
	} else if(number == 2) {
		return 'PAPER';
	} else {
		return 'SCISSORS';
	}
}

// Evaluate result
var isWin = function(yourTurn, computerTurn) {

	if (yourTurn === computerTurn) {
		return null;
	}else if ((yourTurn == 'PAPER' && computerTurn == 'SCISSORS') || (yourTurn == 'ROCK' && computerTurn == 'PAPER') || (yourTurn == 'SCISSORS' && computerTurn == 'ROCK')){
		return false;
	} else
		return true;
}

// Validate result
var resultMessage = function(isWin) {

	if (isWin == true) {
		params.pointsPlayer += 1;
		return 'YOU WON';
	}else if (isWin == false) {
		params.pointsComputer += 1;
		return 'YOU LOSE';
	}else {
		return 'DRAW';
	}
}



// Print round
var printRound = function(turnp, turnc) {

	var round = isWin(validateTurn(turnp), validateTurn(turnc));

	return output.innerHTML = '<h2>' + resultMessage(round) + '</h2><br><h3> You played ' + '<strong>' + validateTurn(turnp) + '</strong>' + '<br>' + 'Computer played ' + '<strong>' + validateTurn(turnc) + '</strong>' + '</h3>';
}

// Print game
var printGame = function() {
	return result.innerHTML ='<h1>Player ' + params.pointsPlayer + ' / ' + params.pointsComputer + ' Computer</h1>';
}

// Print rounds
var printRounds = function(rounds) {
	return winRounds.innerHTML = '<h1>' + '<span>' + params.rounds + '</span>' + ' points to win the game !' + '</h1>';
}

// Clear play board
var clearRound = function() {
	return output.innerHTML = '<h2>' + '</h2>';
}

// Print Table
var printTable = function(i) {
        	return tableRow.innerHTML += 
        		'<tr>' + 
        			'<td>' + params.progress[i].round + '</td>' + 
        			'<td>' + params.progress[i].playerMove + '</td>' + 
        			'<td>' + params.progress[i].computerMove + '</td>' + 
        			'<td>' + params.progress[i].roundResult + '</td>' + 
        			'</tr>';
}

// Clear play board
var clearGame = function() {
	return result.innerHTML = '<h2>' + '</h2>';
}

// Player move function
var playerMove = function(playerTurn) {

	won(params.pointsPlayer, params.pointsComputer, params.rounds);

	if (params.finishRound == false) {
		params.playerTurn = playerTurn;
		params.computerTurn = random(1, 3);

		params.round += 1;

		params.progress.push({
			round: params.round, 
			playerMove: validateTurn(params.playerTurn), 
			computerMove: validateTurn(params.computerTurn),
			roundResult: resultMessage(isWin(validateTurn(params.playerTurn), validateTurn(params.computerTurn))),
			
		});


		printRound(params.playerTurn, params.computerTurn);
		printGame();
	}else 
		return false;
}


var buttons = document.querySelectorAll('.player-move');

for (var i = 0; i < buttons.length; i++) {
	// Function on button click
	 buttons[i].addEventListener('click', function () {

	 	var currentMove = this.getAttribute('data-move');

	 	if(currentMove == 'rock') {
	 		params.turn = 1;
	 	} else if (currentMove == 'paper') {
	 		params.turn = 2;
	 	} else {
	 		params.turn = 3;
	 	}

	 	if (canPlay(params.rounds) == true) {
			playerMove(params.turn);
		} else 
			return false;

		}, false);
	}


// New Game
buttonNewGame.addEventListener('click', function(){
	
	// Prompt window
	params.rounds = window.prompt('Type number of points to win the game:');

	// Validate input then evalute if needed 
	if(isNaN(params.rounds)) {
		winRounds.innerHTML = '<h1>You .must type a number.</h1><br><br>';
	} else if(params.rounds == null) {
		winRounds.innerHTML = '<h1>Canceled.</h1><br><br>';
	} else 
		
		printRounds(params.round);

		// Set New Game
		params.finishRound = false;
		params.pointsPlayer = 0;
		params.pointsComputer = 0;

		params.round = 0;
		params.turn = 0;
		params.yourTurn = 0;
	    params.computerTurn = 0;
	    params.progress = [];

	    console.log(params.rounds);

		clearRound();
		clearGame();
		document.querySelector('.result').classList.remove('hide');
		tableRow.innerHTML = '';
	
}); 

// Validate game 
var canPlay = function(rounds) {
	if (params.rounds < 1) {
		return false;
	}else 
		return true;
}

// Won
var won = function(pointsPlayer, pointsComputer, rounds) {
	if (params.pointsPlayer == params.rounds) {
		params.rounds = 0;
		params.finishRound = true;

		document.querySelector('#modal-one').classList.remove('show');
        document.querySelector('#modal-two').classList.remove('show');
        document.querySelector('#modal-three').classList.remove('show');
        document.querySelector('#rockButton').classList.add('hide');
        document.querySelector('#paperButton').classList.add('hide');
        document.querySelector('#scissorsButton').classList.add('hide');
        document.querySelector('.result').classList.add('hide');

		for (var i = 0; i < params.progress.length; i++) { 
		    printTable(i);
		}

		document.querySelector('#modal-one').classList.add('show');
        document.querySelector('#modal-overlay').classList.add('show');

		return winRounds.innerHTML = '<h1>' + 'You won the game !' + '</h1>' + '<br>' + '<h1>Game Over. Click New Game button to play !</h1>';
	}else if (params.pointsComputer == params.rounds) {
		params.rounds = 0;
		params.finishRound = true;

		document.querySelector('#modal-one').classList.remove('show');
        document.querySelector('#modal-two').classList.remove('show');
        document.querySelector('#modal-three').classList.remove('show');
        document.querySelector('#rockButton').classList.add('hide');
        document.querySelector('#paperButton').classList.add('hide');
        document.querySelector('#scissorsButton').classList.add('hide');
        document.querySelector('.result').classList.add('hide');

        for (var i = 0; i < params.progress.length; i++) { 
        	printTable(i);
        }
        

        document.querySelector('#modal-one').classList.add('show');
        document.querySelector('#modal-overlay').classList.add('show');
		return winRounds.innerHTML = '<h1>' + 'Computer won the game !' + '</h1>' + '<br>' + '<h1>Game Over. Click New Game button to play !</h1>';
	}
} 




var showModal = function(event){
        event.preventDefault();

        document.querySelector('#modal-one').classList.remove('show');
        document.querySelector('#modal-two').classList.remove('show');
        document.querySelector('#modal-three').classList.remove('show');

    	console.log(event.currentTarget.getAttribute('href'));

        document.querySelector(event.currentTarget.getAttribute('href')).classList.add('show');

        document.querySelector('#modal-overlay').classList.add('show');
    };
    
    // Mimo, że obecnie mamy tylko jeden link, stosujemy kod dla wielu linków. W ten sposób nie będzie trzeba go zmieniać, kiedy zechcemy mieć więcej linków lub guzików otwierających modale
    
    var modalLinks = document.querySelectorAll('.show-modal');
    
    for(var i = 0; i < modalLinks.length; i++){
        modalLinks[i].addEventListener('click', showModal);
    }
    
    // Dodajemy też funkcję zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close". 

    var hideModal = function(event){
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');

        document.querySelector('#rockButton').classList.remove('hide');
        document.querySelector('#paperButton').classList.remove('hide');
        document.querySelector('#scissorsButton').classList.remove('hide');
        document.querySelector('.result').classList.remove('hide');

        params.progress = [];

        clearRound();
		clearGame();
    };
    
    var closeButtons = document.querySelectorAll('.modal .close');
    
    for(var i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', hideModal);
    }
    
    // Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 
    
    document.querySelector('#modal-overlay').addEventListener('click', hideModal);
    
    // Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 
    
    var modals = document.querySelectorAll('.modal');
    
    for(var i = 0; i < modals.length; i++){
        modals[i].addEventListener('click', function(event){
            event.stopPropagation();
        });
    }
    

})(); 