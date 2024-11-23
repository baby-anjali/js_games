const borders = '┈';

const gameTitle = `
┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈
\t\t🐵ESCAPE FROM THE DRAGON 🔥🐉
┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈༶┈┈•┈┈
`;

const gameDescription = `
Chiku, the monkey  is stranded in a river.
His home is the tree on the other side of the river.
But he is not alone. A dragon is also with him! 
Help Chiku escape from the dragon, by solving the puzzles.
`;

const instructionHeader = '« « « INSTRUCTIONS » » »';

const instructions = `
• There are 3 levels in total:
\t Easy level 
\t Medium level
\t Hard level
• Solving each level lets Chiku move forward by 1 (easy), 2 (medium) and 3 (hard)
• Questions are given to guess the word and along with clues
• Every wrong question will make the dragon move forward, SO BE CAREFUL

`;

const rightAnswerMessage = "Yes! You got it!😮‍💨";
const wrongAnswerMessage1 = "Oh no! That's wrong. Try again. 1 chance left!😰";
const wrongAnswerMessage2 = "You didn't guess the word! Dragon is near!😱";

const question = {
  1 : 'I look spiky from outside but I am soft on the inside',
  2 : 'In the dark, I am your guide',
  3 : 'I shine like the brightest star, hanging from above',
  4 : 'I have all the food, but I cannot eat any of them',
  5 : 'I show you a tiny vast world, that your eyes cannot see',
  6 : 'You bounce on me, and you reach for the sky',
  7 : "I am full of stories and pictures, yet I don't tell a tale",
  8 : "I turn but never walk, I help twist what is tight"
} 

const answer = {
  1 : 'pineapple',
  2 : 'flashlight',
  3 : 'chandelier',
  4 : 'refrigerator',
  5 : 'microscope',
  6 : 'trampoline',
  7 : 'television',
  8 : 'screwdriver'
}

const point = {
  1 : 1,
  2 : 1,
  3 : 1,
  4 : 2,
  5 : 2,
  6 : 2,
  7 : 3,
  8 : 3
}

const LENGTH = Object.keys(question).length;

function isDivisible(dividend, divisor) {
  return dividend % divisor === 0;
}

function encrypt(word, number, encryptBy) {
  let encryptedWord = '';

  for (let i = 0; i < word.length; i++) {
    const charToAdd = isDivisible(i, number) ? encryptBy : word[i];
    encryptedWord = encryptedWord + charToAdd;
  }

  return encryptedWord;
}

function createClues(number) {
  let dictionary = {};
  for (let i = 1; i <= LENGTH; i++) {
    dictionary[i + ''] = encrypt(answer[i + ''], number, '_')
  }

  return dictionary;
}

const clue1 = createClues(2);
const clue2 = createClues(3);

const totalChances = 2;

let playArea = 'T|WWWWWWWWWWM|D';

function repeat(string, number) {
  let repeatedString = '';

  for (let i = 0; i < number; i++) {
    repeatedString = repeatedString + string;
  }

  return repeatedString;
}

function borderDecor(string) {
  const requiredBorder = repeat(borders, string.length);
  return requiredBorder + '\n' + string + '\n' + requiredBorder;
}

function lineDecor(string) {
  const requiredBorder = repeat(borders, string.length / 10);
  return requiredBorder + string + requiredBorder;
}

function getEmoji(string) {
  switch(string) {
    case 'T': return '🌳';
    case 'W': return '🌊';
    case 'M': return '🐒';
    case 'D': return '🐉';
    case '|': return '🚧';
  }
}

function emojiVersion(string) {
  let emojiVersion = '';
  for(let i = 0; i < string.length; i++) {
    emojiVersion = emojiVersion + getEmoji(string[i]) + ' ';    
  }

  return emojiVersion;
}

function max(first, second) {
  return first > second ? first : second;
}

function findIndex(string, charToFind) {
  for(let index = 0; index < string.length; index++) {
    if (charToFind === string[index]) {
      return index;
    }
  }

  return -1;
}

function replaceByIndex(text, targetIndex, replacement) {
  let replacedText = '';
  
  for(let index = 0; index < text.length; index++) {
    const charToAdd = index === targetIndex ? replacement : text[index];

    replacedText += charToAdd;
  }
  return replacedText;
}

function isMonkeySafeInRiver() {
  return findIndex(playArea, 'M') < findIndex(playArea, 'D') && !isMonkeyHome();
}

function isMonkeyHome() {
  return findIndex(playArea, 'M') === 1;
}

function finalResult() {  
  if (isMonkeyHome()) {
    return "YAAAAY! Chiku got back to his home!!🥳 You saved him!";
  }

  if (!isMonkeySafeInRiver) {
    return "The dragon got Chiku! You didn't save him!!!😭";
  }
  
  return "Chiku escaped from the dragon but drowned in the water😓";
}

function finalPlayArea() {
  console.clear();
  
  if (isMonkeyHome()) {
    return emojiVersion('TM|WWWWWWWWWW|D');
  }

  return emojiVersion(playArea);
}

function wrongAnswerMessage(chances) {
  return chances === 1 ? wrongAnswerMessage1 : wrongAnswerMessage2;
}

function makeMove(char, points) {
  let index = findIndex(playArea, char);

  const obstacleIndex = max(1, index - points);
  playArea = replaceByIndex(playArea, index, playArea[obstacleIndex]);

  index = obstacleIndex;
  playArea = replaceByIndex(playArea, index, char);

  return emojiVersion(playArea);
}

function askQuest(question, word, clue1, clue2, points) {
  console.log('Find the word:', '\n\t')
  console.log(lineDecor(question), '\n');
  let chancesLeft = totalChances;
  let clue = clue1;
  
  while (chancesLeft > 0) {
    const guess = prompt(clue + ':');
    
    if(guess.length < word.length) {
      console.log('Enter something long enough...😃');
      continue;
    }
    
    if (guess !== word) {
      clue = clue2;
      chancesLeft--;
      console.log(wrongAnswerMessage(chancesLeft));
      continue;
    }
    
    console.log('\n', rightAnswerMessage);
    makeMove('M', points);
    return;    
  }
  
  makeMove('D', 1);
  return;
}

function startGame() {
  let key = 1;
  
  while(isMonkeySafeInRiver() && key < 9) {
    prompt("press to continue");
    
    console.clear();
    console.log(borderDecor(emojiVersion(playArea)) + '\n');
    askQuest(question[key], answer[key], clue1[key], clue2[key], point[key]);
    
    key++;
  }
  
  return;
}

function loadGame() {
  console.log(gameTitle, gameDescription);
  console.log(borderDecor(instructionHeader));
  console.log(instructions);
  
  startGame();
  
  console.log(finalPlayArea());
  console.log(finalResult());
  console.log("\nThank you for playing!");
  return;
}

loadGame();
