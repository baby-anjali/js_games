const welcomeMessage = '*----------Snake & Ladder----------* \n' +
  '<<-<---🐍🐍🐍---🎲---🪜🪜🪜----->->>\n' +
  'Let\'s start! 🏁🏁🏁\n\n';

const tabs = '\t\t\t';

let player1 = '';
let player2 = '';

let player1Position = 0;
let player2Position = 0;

const borderUp = '╒════════╕'
const borderDown = '╘════════╛'

const snakeComment1 = "Oh no!😱 A snake has bitten "
const snakeComment2 = "...🐍 You're going down🥲⬇️ ";
const ladderComment1 = "Woah!😳 ";
const ladderComment2 = " got a ladder...🪜 You're climbing up😄⬆️";

function congratulate(winner) {
  console.log('Woohoo!!!', winner, 'has won!🥳🎉🎊');  
}

function addBorders(string) {
  return '┃' + string + '┃';
}

const EMPTY = addBorders('⚫️ ⚫️ ⚫️');
const TWO_WHITES = addBorders('⚪️ ⚫️ ⚪️');
const LEFT_WHITE = addBorders('⚪️ ⚫️ ⚫️');
const RIGHT_WHITE = addBorders('⚫️ ⚫️ ⚪️');
const MIDDLE_WHITE = addBorders('⚫️ ⚪️ ⚫️');

function wait(limit) {
  for (let i = 0; i < limit; i++);
}

function joinLines(first, second, third) {
  return first + '\n' + second + '\n' + third;
}

function getFace(number) {
  switch (number) {
    case 1:
      return joinLines(EMPTY, MIDDLE_WHITE, EMPTY);
    case 2:
      return joinLines(LEFT_WHITE, EMPTY, RIGHT_WHITE);
    case 3:
      return joinLines(LEFT_WHITE, MIDDLE_WHITE, RIGHT_WHITE);
    case 4:
      return joinLines(TWO_WHITES, EMPTY, TWO_WHITES);
    case 5:
      return joinLines(TWO_WHITES, MIDDLE_WHITE, TWO_WHITES);
    case 6:
      return joinLines(TWO_WHITES, TWO_WHITES, TWO_WHITES);
  }
}

function getDiceFace(number) {
  return joinLines(borderUp, getFace(number), borderDown);
}

function animateDiceRoll() {
  for (let j = 0; j < 5; j++) {
    for (let i = 1; i < 7; i++) {
      console.log(getDiceFace(i));
      wait(8 ** 9);
      console.clear();
    }
  }
}

function endMessage(winner) {
  console.log(winner, 'has won the game!🎊🎉🥳 Thank you for playing!!!');
}

function scoreboard(player1, player2){
  const scoreLine1 = '\n»»——⍟——⍟——⍟——⍟——⍟ Current positions ⍟——⍟——⍟——⍟——⍟——««';
  let scoreLine2 = '\n\n\t' + player1 + " : " + player1Position + tabs;
  let scoreLine3 = player2 + " : " + player2Position + "\n";
  let scoreLine4 = '\n»»——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——««\n';
  
  console.log(scoreLine1 + scoreLine2 + scoreLine3 + scoreLine4);
}

function getRandomInt() {
  return Math.ceil(Math.random() * 6);
}

function getName(text) {
  const name = prompt("Enter " + text + " player's name: ");
  
  if(name !== '') {
    return name;
  }
  
  return getName(text);
}

function onSnake(position) {
  switch (position) {
    case 98: return 80;
    case 96: return 65;
    case 88: return 22;
    case 70: return 50;
    case 63: return 4;
    case 42: return 20;
    case 14: return 10;
    default: return position;
  }
}

function onLadder(position) {
  switch (position) {
    case 2: return 37;
    case 8: return 30;
    case 18: return 72;
    case 33: return 94;
    case 40: return 60;
    case 57: return 82;
    default: return position;
  }
}

function getComments(player, newPosition, currentPosition) {
  if (newPosition < currentPosition) {
    return snakeComment1 + player + snakeComment2;
  }

  if (newPosition > currentPosition) {
    return ladderComment1 + player + ladderComment2;
  }

  return '';
}

function isOnSnakeOrLadder (position) {
  const newPosition = onSnake(position);
  return onLadder(newPosition);
}

function playerMove(player, position, diceValue) {
  const currentPosition = position + diceValue;
  
  if (currentPosition > 100) {
    console.log('You need exact number to home or lesser number to move ahead');
    
    return position;
  }
  
  const newPosition = isOnSnakeOrLadder(currentPosition);

  console.log(getComments(player, newPosition, currentPosition));
  return newPosition;
}

function turnToPlay(player, position) {
  scoreboard(player1, player2);
  prompt(player, "'s turn to play");

  animateDiceRoll();
  const diceValue = getRandomInt();
  
  console.log(getDiceFace(diceValue));
  console.log(player, 'got a ', diceValue);
  
  position = playerMove(player, position, diceValue);
  return position;
}

function startGame(player1, player2) {
  while (player2Position < 100) {
    player1Position = turnToPlay(player1, player1Position);
    
    if(player1Position === 100) {
      return player1;
    }
    
    player2Position = turnToPlay(player2, player2Position);
  }

  return player2;  
}

function loadGame() {
  console.log(welcomeMessage);
  
  player1 = getName('first');
  player2 = getName('second');
  
  const winner = startGame(player1, player2);
  congratulate(winner);
}

loadGame();
