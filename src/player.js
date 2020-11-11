class Player {
  constructor(id, token) {
    this.id = id;
    this.storageID = `${id}-ttt-wins`;
    this.token = token;
    this.wins = this.retrieveWins() || [];
  }

  gameWon(gameBoard) {
    this.wins.push(gameBoard);
  }

  saveWins() {
    localStorage.setItem(this.storageID, JSON.stringify(this.wins));
  }

  retrieveWins() {
    var wins = localStorage.getItem(this.storageID);
    return JSON.parse(wins);
  }
}
