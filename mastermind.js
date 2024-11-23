const patternLength = 8;
const SPACE = ' ';
const EMPTY = '';
const totalChances = 8;

const VALUE_CORRECT = '⚪️';
const POSITION_CORRECT = '🔵';

const gameTitle = `
┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶
\t\tMASTERMIND
༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈
`;

const instructionHeader = '\n« « « INSTRUCTIONS » » »';

const instructions = `
• There is a secret pattern of 4 numbers that you should guess
• You have 8 chances to guess it right
• Insert spaces after every number
• For every correct guess of each number you will get a signal\n
` + VALUE_CORRECT + `-> for every correct number\n` + POSITION_CORRECT +
  `-> for every correct number at the correct position\n`;

let isGameClear = false;

function getRandomNumber() {
  return Math.ceil(Math.random() * 9);
}

function isPresent(text, char) {
  for (let index = 0; index < text.length; index++) {
    if (text[index] === char) {
      return true;
    }
  }

  return false;
}

function makePattern() {
  let actualPattern = EMPTY;

  while (actualPattern.length < patternLength) {
    const newNumber = '' + getRandomNumber();

    if(!isPresent(actualPattern, newNumber)) {
      actualPattern += SPACE + newNumber;
    }    
  }

  return actualPattern;
}

function userGuess() {
  const userInput = prompt('\nEnter your pattern💫: ');
  return SPACE + userInput;
}

function isPatternValid(userPattern) {
  return userPattern.length < patternLength;
}

function findIndex(string, charToFind) {
  for(let index = 0; index < string.length; index++) {
    if (charToFind === string[index]) {
      return index;
    }
  }

  return -1;
}

function isAtGivenIndex(text, char, index) {
  return findIndex(text, char) === index;
}

function getPegs(actual, userGuess) {
  let pegs = EMPTY;

  for (let index = 0; index < patternLength; index++) {
    const isSpace = actual[index] === SPACE;
    const isFound = isPresent(actual, userGuess[index]);

    if (!isSpace && isFound) {
      const isSameIndex = isAtGivenIndex(actual, userGuess[index], index);
      pegs += isSameIndex ? POSITION_CORRECT : VALUE_CORRECT;
    }
  }

  return pegs;
}

function isCodeCracked(pegs) {
  return pegs === '🔵🔵🔵🔵';
}

function startGame() {
  const masterPattern = makePattern();
  let chancesLeft = totalChances;

  while (chancesLeft > 0 && !isGameClear) {
    const userPattern = userGuess();

    if (isPatternValid(userPattern)) {
      console.log('Enter valid input!');
      continue;
    }

    const currentPeg = getPegs(userPattern, masterPattern);
    console.log(currentPeg);

    isGameClear = isCodeCracked(currentPeg);
    chancesLeft--;
  }

  if (chancesLeft === 0) {
    console.log("The pattern was", masterPattern);
  }
}

function loadGame() {
  console.clear();
  console.log(gameTitle, instructionHeader, instructions);
  prompt('press enter to start');
  
  startGame();
  
  const win = "YOU GUESSED THE PATTERN CORRECTLY! YOU ARE A MASTERMIND!🎊🎉";
  const lose = "You lost your chances! Oh well, better luck next time!😓";
  
  const finalResult = isGameClear ? win : lose;

  console.log(finalResult);
  console.log('Thank you for playing!');
}

loadGame();
