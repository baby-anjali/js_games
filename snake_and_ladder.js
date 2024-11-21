const welcomeMessage = '*----------Snake & Ladder----------* \n' +
  '<<-<---🐍🐍🐍---🎲---🪜🪜🪜----->->>';

// const tabs = '\t\t\t\t\t';
let winner = '';

let player1Position = 0;
let player2Position = 0;

function wait(limit) {
  for (let i = 0; i < limit; i++);
  return;
}

function scoreboard(player1, player2) {
  console.clear();

  const scoreLine1 = '»»——⍟——⍟——⍟——⍟ Current positions ⍟——⍟——⍟——⍟——««\n\n';
  let scoreLine2 = player1 + "'s position: " + player1Position + "\n";
  let scoreLine3 = player2 + "'s position: " + player2Position + "\n";

  console.log(scoreLine1 + scoreLine2 + scoreLine3);

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
  prompt(player + ' roll the dice');
  const diceValue = Math.ceil(Math.random() * 6);
  console.log(player + ' got ' + diceValue + '!');

  return diceValue;
}

function reached100(player1, player2) {
  if (player1Position === 100 || player1Position === 100) {
    winner = player1Position === 100 ? player1 : player2;
  }

  return winner !== '';
}

function playerMove(position, diceValue) {
  position = position + diceValue;

  if (position > 100) {
    return position - diceValue;
  }

  let newPosition = onSnake(position);
  if (newPosition !== position) {
    console.log("Oh no!😱 A snake has bitten you...🐍 You're going down🥲⬇️ \n");
    return newPosition;
  }
  
  newPosition = onLadder(position);
  if (newPosition !== position) {
    console.log("\nWoah!😳 You got a ladder...🪜 You're climbing up😄⬆️\n");
    return newPosition;
  }

  return position;
}

function playerRoll(player, position) {
  let playerDice = rollDice(player);

  return playerMove(position, playerDice);
}

function startGame(player1, player2) {
  scoreboard(player1, player2);
  player1Position = playerRoll(player1, player1Position);

  if (reached100(player1, player2)) {
    return;
  }

  console.log('\n');
  player2Position = playerRoll(player2, player2Position);

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

  const player1 = prompt("Enter first player's name: ", "Player1");
  const player2 = prompt("Enter first player's name: ", "Player2");

  prompt('Game start!\t🔴-🟡-🟢\n(press enter)');
  console.clear();

  while (winner === '') {
    startGame(player1, player2);    
    wait(8 ** 10);
  }

  console.clear();
  const loser = winner === player1 ? player2 : player1;
  console.log(winner + ' has won the game! ' + loser + ' lost...');
}

isPlaying();
