const WIN_CONDITIONS = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Array(9).fill(" ");
    this.turn = 1;
    this.status = `Current Turn: ${this.getPlayerTurn().token}`;
  }

  resetGame() {
    this.board = new Array(9).fill(" ");
    this.turn = 1;
  }

  printBoard() {
    var b = this.board;
    console.log(`
      ${b[0]} | ${b[1]} | ${b[2]}
      ---|---|---
      ${b[3]} | ${b[4]} | ${b[5]}
      ---|---|---
      ${b[6]} | ${b[7]} | ${b[8]}
    `);
  }

  selectSpace(space) {
    var player = this.getPlayerTurn();
    if (this.board[space] === " ") {
      this.board[space] = player.token;
      this.turn += 1;
      this.checkForWins(player);
    }
    // this.printBoard();
  }

  getOccupiedSpaces(playerToken) {
    var spaces = [];
    for (var i = 0; i < this.board.length; i++) {
      if (this.board[i] === playerToken) {
        spaces.push(i);
      }
    }
    return spaces;
  }

  // Array.prototype.every example
  checkIfPlayerWon(player) {
    var occupiedSpaces = this.getOccupiedSpaces(player.token);

    for (var i = 0; i < WIN_CONDITIONS.length; i++) {
      var gameWon = WIN_CONDITIONS[i].every(function (space) {
        return occupiedSpaces.includes(space);
      });
      if (gameWon) {
        return gameWon;
      }
    }
    return false;
  }

  // Nested loops example
  // checkGameWon() {
  //   var gameWon = false;
  //   if (playerMoves.length > 2) {
  //     for (var i = 0; i < WIN_CONDITIONS.length; i++) {
  //       // iterate through the possible win conditions
  //       for (var k = 0; k < WIN_CONDITIONS[i].length; k++) {
  //         // iterate through each # in a win condition
  //         if (!playerMoves.includes(WIN_CONDITIONS[i][k])) {
  //           // player hasn't selected a space in this win condition, exit early
  //           gameWon = false;
  //           break;
  //         } else {
  //           gameWon = true;
  //           break;
  //         }
  //       }
  //       if (gameWon) {
  //         // if gameWon is true here, it means all entries in a WIN_CONDITION
  //         // were found in the players selected spaces, therefore they've won
  //         return gameWon;
  //       }
  //     }
  //   }
  //   return gameWon;
  // }

  checkForTieGame() {
    return this.turn > 9;
  }

  handleGameWon(player) {
    this.status = `Game won by: ${player.token}`;
    player.wins.push(this.board);
    player.saveWins();
    this.resetGame();
  }

  getPlayerTurn() {
    var playerTurn = this.turn % 2 === 0 ? this.player2 : this.player1;
    return playerTurn;
  }

  checkForWins(player) {
    var gameWon = this.checkIfPlayerWon(player);
    var gameTied = this.checkForTieGame();

    if (gameWon) {
      this.handleGameWon(player);
    } else if (gameTied) {
      this.status = "tie game!!";
      this.resetGame();
    } else {
      this.status = `Current turn: ${this.getPlayerTurn().token}`;
    }
  }
}
