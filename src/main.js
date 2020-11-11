var g = null;
var p1 = null;
var p2 = null;

function addClickListenersToBoard() {
  for (var i = 0; i < 9; i++) {
    document.getElementById(i).addEventListener("click", handleSpaceClicked);
  }
}

function updateGame() {
  for (var i = 0; i < 9; i++) {
    document.getElementById(i).innerText = g.board[i];
  }
  updateGameState();
  addWinsToBoard(p1);
  addWinsToBoard(p2);
}

function updateGameState() {
  document.getElementById("game-status").innerText = g.status;
}

function createWinCard(win) {
  var card = document.createElement("article");
  card.classList.add("win-card");
  card.innerHTML = `
    <div class="win-card-space">${win[0]}</div>
    <div class="win-card-space">${win[1]}</div>
    <div class="win-card-space">${win[2]}</div>
    <div class="win-card-space">${win[3]}</div>
    <div class="win-card-space">${win[4]}</div>
    <div class="win-card-space">${win[5]}</div>
    <div class="win-card-space">${win[6]}</div>
    <div class="win-card-space">${win[7]}</div>
    <div class="win-card-space">${win[8]}</div>`;

  return card;
}

function addWinsToBoard(player) {
  var playerWinsContainer = document.getElementById(player.id);

  // Only update the container if there's a new win
  if (playerWinsContainer.children.length < player.wins.length) {
    playerWinsContainer.innerHTML = "";

    for (var i = 0; i < player.wins.length; i++) {
      var winCard = createWinCard(player.wins[i]);
      playerWinsContainer.appendChild(winCard);
    }
  }
}

function createNewGame() {
  p1 = new Player("p1", "🤷‍♂️");
  p2 = new Player("p2", "💃🏻");
  g = new Game(p1, p2);
}

function handleSpaceClicked(e) {
  e.preventDefault();
  g.selectSpace(e.target.id);
  updateGame();
}

function updateUserTokens() {
  document.getElementById("p1-token").innerText = p1.token;
  document.getElementById("p2-token").innerText = p2.token;
}

function init() {
  createNewGame();
  addClickListenersToBoard();
  updateUserTokens();
  updateGame();
}

window.onload = init();
