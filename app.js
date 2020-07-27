// game values
let min = 1,
	max = 10,
	winningNum = getRandomNum(min, max),
	guessesLeft = 3;

// ui elements
const game = document.getElementById('game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessBtn = document.getElementById('guess-btn'),
	guessInput = document.getElementById('guess-input'),
	message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again listener
game.addEventListener('mousedown', function (e) {
	if (e.target.className === 'play-again') {
		// clear input
		guessInput.value = '';
		window.location.reload();
	}
});

// listen for guess
guessBtn.addEventListener('click', function (e) {
	let guess = parseInt(guessInput.value);

	// validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`please enter a number between ${min} and ${max}`, 'red');
	}

	// check if won
	if (guess === winningNum) {
		// game won
		gameOver(true, `${winningNum} is correct, you win!`);
	} else {
		// wrong number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			// game lost
			gameOver(false, `${winningNum} was the correct answer, you loose.`);
		} else {
			// change border color
			guessInput.style.borderColor = 'red';
			// game continues
			setMessage(`its not ${guess}, ${guessesLeft} guesses left.`, 'red');
			// clear input
			guessInput.value = '';
		}
	}
});

// game over
function gameOver(won, msg) {
	let color;
	won === true ? (color = 'green') : (color = 'red');
	// disable input
	guessInput.disabled = true;
	// change border color
	guessInput.style.borderColor = color;
	// set message
	setMessage(msg, color);

	// play again
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again';
}

// get winning number
function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}
