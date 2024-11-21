const rangeStart = 1;
const rangeEnd = 100;
const maxAttempts = 5;

const welcomeMessage = '*----------Welcome to Guess the Number!----------* \n'
  + '\nThe secret number is between ' + rangeStart + ' and ' + rangeEnd + '.'
  + ' You have ' + maxAttempts + ' attempts to find it.'

function printMessage(text) {
  console.log(text);
  return;
}

function getRandomNumber(from, to) {
  return Math.ceil(Math.random() * 100);
}

function hintMessage(guess, random) {
  if (guess > random) {
    return 'Too high! Try something lower.';
  }

  return 'Too low! Try something higher.';
}

function wrongAnswer(guess, random) {
  if (!guess) {
    return 'Invalid input! Enter a number!';
  }

  return hintMessage(guess, random);
}

function guessMessage(chances) {
  return 'Guess the secret number. You have ' + chances + ' attempts left.';
}

function startGame(random) {
  let chancesLeft = maxAttempts;

  while (chancesLeft > 0) {
    const guess = +prompt('\n' + guessMessage(chancesLeft) + '\n');

    if (guess === random) {
      printMessage('Bravo! You have guessed it right!');
      return;
    }
    
    console.log(wrongAnswer(guess, random));
    chancesLeft--;
  }

  console.clear();
  printMessage('Maximum attempts over! You did not guess the number right!');
  printMessage('The secret number was ' + random);
}

function isPlaying() {
  console.log(welcomeMessage);
  
  if (!confirm('\nDo you want to play?')) {
    return;
  } 

  startGame(getRandomNumber());

  while (confirm('\nDo you want to continue?')) {
    const random = getRandomNumber();
    startGame(random);
  }

  printMessage('Thank you for playing!');
  return;
}

isPlaying();
