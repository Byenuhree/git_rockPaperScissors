// ARROW
const arrowUp = document.querySelector(".arrow-up");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    arrowUp.classList.add("active");
  } else {
    arrowUp.classList.remove("active");
  }
});

// GAME
let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = "tie";
  }
  if (
    (playerSelection === "GRASS" && computerSelection === "WATER") ||
    (playerSelection === "WATER" && computerSelection === "FIRE") ||
    (playerSelection === "FIRE" && computerSelection === "GRASS")
  ) {
    playerScore++;
    roundWinner = "player";
  }
  if (
    (computerSelection === "GRASS" && playerSelection === "WATER") ||
    (computerSelection === "WATER" && playerSelection === "FIRE") ||
    (computerSelection === "FIRE" && playerSelection === "GRASS")
  ) {
    computerScore++;
    roundWinner = "computer";
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection);
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "GRASS";
    case 1:
      return "FIRE";
    case 2:
      return "WATER";
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

// UI

const scoreInfo = document.getElementById("scoreInfo");
const scoreMessage = document.getElementById("scoreMessage");
const playerScorePara = document.getElementById("playerScore");
const computerScorePara = document.getElementById("computerScore");
const playerSign = document.getElementById("playerSign");
const computerSign = document.getElementById("computerSign");
const rockBtn = document.getElementById("grass");
const paperBtn = document.getElementById("water");
const scissorsBtn = document.getElementById("fire");
const endgameModal = document.getElementById("endgameModal");
const endgameMsg = document.getElementById("endgameMsg");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restartBtn");

rockBtn.addEventListener("click", () => handleClick("GRASS"));
paperBtn.addEventListener("click", () => handleClick("WATER"));
scissorsBtn.addEventListener("click", () => handleClick("FIRE"));
restartBtn.addEventListener("click", restartGame);
overlay.addEventListener("click", closeEndgameModal);

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModal();
    return;
  }

  const computerSelection = getRandomChoice();
  playRound(playerSelection, computerSelection);
  updateChoices(playerSelection, computerSelection);
  updateScore();

  if (isGameOver()) {
    openEndgameModal();
    setFinalMessage();
  }
}

function updateChoices(playerSelection, computerSelection) {
  const playerImage = document.getElementById("playerImage");
  const computerImage = document.getElementById("computerImage");
  switch (playerSelection) {
    case "GRASS":
      playerImage.src = "src/img/bulbasaur.png";
      playerImage.alt = "bulbasaur";
      break;
    case "WATER":
      playerImage.src = "src/img/squirtle.png";
      playerImage.alt = "squirtle";
      break;
    case "FIRE":
      playerImage.src = "src/img/charmander.png";
      playerImage.alt = "charmander";
      break;
  }

  switch (computerSelection) {
    case "GRASS":
      computerImage.src = "src/img/bulbasaur.png";
      computerImage.alt = "bulbasaur";
      break;
    case "WATER":
      computerImage.src = "src/img/squirtle.png";
      computerImage.alt = "squirtle";
      break;
    case "FIRE":
      computerImage.src = "src/img/charmander.png";
      computerImage.alt = "charmander";
      break;
  }
}

function updateScore() {
  if (roundWinner === "tie") {
    scoreInfo.textContent = "It's a tie!";
  } else if (roundWinner === "player") {
    scoreInfo.textContent = "You won!";
  } else if (roundWinner === "computer") {
    scoreInfo.textContent = "You lost!";
  }

  playerScorePara.textContent = playerScore;
  computerScorePara.textContent = computerScore;
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${computerSelection.toLowerCase()}`;
    return;
  }
  if (winner === "computer") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} is beaten by ${computerSelection.toLowerCase()}`;
    return;
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ties with ${computerSelection.toLowerCase()}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function openEndgameModal() {
  endgameModal.classList.add("active");
  overlay.classList.add("active");
}

function closeEndgameModal() {
  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = "You won!")
    : (endgameMsg.textContent = "You lost...");
}

function restartGame() {
  const playerImage = document.getElementById("playerImage");
  const computerImage = document.getElementById("computerImage");
  playerScore = 0;
  computerScore = 0;
  scoreInfo.textContent = "Choose your starter";
  scoreMessage.textContent = "5 points wins";
  playerScorePara.textContent = "0";
  computerScorePara.textContent = "0";
  playerImage.src = "src/img/Pokeball-0.webp";
  computerImage.src = "src/img/Pokeball-0.webp";
  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}
