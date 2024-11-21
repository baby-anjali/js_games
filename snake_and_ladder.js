const welcomeMessage = '*----------Snake & Ladder----------* \n' +
  '<<-<---🐍🐍🐍---🎲---🪜🪜🪜----->->>';

const borderUp = '╒════════╕\n'
const borderDown = '\n╘════════╛'

const one =  borderUp + '|⚫️ ⚫️ ⚫️|\n|⚫️ ⚪️ ⚫️|\n|⚫️ ⚫️ ⚫️|'  + borderDown;
const two = borderUp + '|⚪️ ⚫️ ⚫️|\n' +  '|⚫️ ⚫️ ⚫️|\n|⚫️ ⚫️ ⚪️|'  + borderDown;
const three = borderUp + '|⚫️ ⚫️ ⚪️|\n' +  '|⚫️ ⚪️ ⚫️|\n|⚪️ ⚫️ ⚫️|'  + borderDown;
const four = borderUp + '|⚪️ ⚫️ ⚪️|\n' +  '|⚫️ ⚫️ ⚫️|\n|⚪️ ⚫️ ⚪️|'  + borderDown;
const five = borderUp + '|⚪️ ⚫️ ⚪️|\n' +  '|⚫️ ⚪️ ⚫️|\n|⚪️ ⚫️ ⚪️|'  + borderDown;
const six = borderUp + '|⚪️ ⚫️ ⚪️|\n' +  '|⚪️ ⚫️ ⚪️|\n|⚪️ ⚫️ ⚪️|'  + borderDown;
  
const tabs = '\t\t\t';
let winner = '';

let player1Position = 0;
let player2Position = 0;

function wait(limit) {
  for (let i = 0; i < limit; i++);
  return;
}

function printDice(number) {
  switch (number) {
    case 1: return one;
    case 2: return two;
    case 3: return three;
    case 4: return four;
    case 5: return five;
    case 6: return six;
  }
}

function diceToggle(dice) {
  console.clear();
  console.log(dice);
  wait(8 ** 9);
  return;
}

function visualDiceRoll() {
  for (let i = 0; i < 5; i++) {
    diceToggle(one);
    diceToggle(two);
    diceToggle(three);
    diceToggle(four);
    diceToggle(five);
    diceToggle(six);
  }

  console.clear();
}

function scoreboard(player1, player2) {
  const scoreLine1 = '\n»»——⍟——⍟——⍟——⍟——⍟ Current positions ⍟——⍟——⍟——⍟——⍟——««';
  let scoreLine2 = '\n\n\t' + player1 + " : " + player1Position + tabs;
  let scoreLine3 = player2 + " : " + player2Position + "\n";
  let scoreLine4 = '\n»»——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——⍟——««';

  console.log(scoreLine1 + scoreLine2 + scoreLine3 + scoreLine4);

  return;
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

function rollDice(player) {
  prompt(player + "'s turn to roll the dice");
  const diceValue = Math.ceil(Math.random() * 6);
  visualDiceRoll();
  console.log(printDice(diceValue));
  console.log('\n' + player + ' got ' + diceValue + '!');
  
  return diceValue;
}

function reached100(player1, player2) {
  if (player1Position === 100 || player2Position === 100) {
    winner = player1Position === 100 ? player1 : player2;
  }
  
  return winner !== '';
}

function playerMove(player, position, diceValue) {

  position = position + diceValue;
  
  if (position > 100) {
    return position - diceValue;
  }
  
  let newPosition = onSnake(position);
  if (newPosition !== position) {
    console.log("Oh no!😱 A snake has bitten " + player + "...🐍 You're going down🥲⬇️ \n");
    return newPosition;
  }
  
  newPosition = onLadder(position);
  if (newPosition !== position) {
    console.log("\nWoah!😳 " + player + " got a ladder...🪜 " + player + " is climbing up😄⬆️\n");
    return newPosition;
  }
  
  return position;
}

function playerRoll(player, position) {
  let playerDice = rollDice(player);
  
  return playerMove(player, position, playerDice);
}

function startGame(player1, player2) {
  console.log();
  player1Position = playerRoll(player1, player1Position);
  scoreboard(player1, player2);
  
  if (reached100(player1, player2)) {
    return;
  }
  
  console.log();
  player2Position = playerRoll(player2, player2Position);
  scoreboard(player1, player2);
  
  if (reached100(player1, player2)) {
    return;
  }
}

function isPlaying() {
  console.log(welcomeMessage + '\n');

  if (!confirm('Do you want to play?')) {
    console.log('Ok, bye!');
    return;
  }

  const player1 = prompt("Enter first player's name: ", "Sam");
  const player2 = prompt("Enter second player's name: ", "Julie");

  prompt('Game start!\t🔴-🟡-🟢\n(press enter)');
  console.clear();

  scoreboard(player1, player2);

  while (winner === '') {
    startGame(player1, player2);    
  }

  console.clear();
  const loser = winner === player1 ? player2 : player1;
  console.log('\n' + winner + ' has won the game!🥳🎉🎊\n' + loser + ' lost...😭🥀');
  console.log('Thank you staying here. Have a nice day!😁\n');
}

isPlaying();
