const choices = ["bato", "papel", "gunting"]
let winnersLog = []

function game() {
  for (let i = 1; i <= 5; i++) {
    playFiveRounds(i)
  }
  showResult()
}

function playFiveRounds(rounds) {
  const playerSelect = playerChoice()
  const computerSelect = computerChoice()
  const winners = winnerConfirmation(playerSelect, computerSelect)
  winnersLog.push(winners)
  winnerPerRounds(playerSelect, computerSelect, winners, rounds)
}

function playerChoice() {
  let inputVal = prompt("Type: Bato, Papel, or Gunting")
  while (inputVal === null) {
    inputVal = prompt("Please type: Bato, Papel, or Gunting")
  }
  inputVal = inputVal.toLowerCase()
  let elementCheck = arrayChecker(inputVal)
  while (elementCheck === false) {
    inputVal = prompt("404 please type: Bato, Papel, or Gunting")
    inputVal = inputVal.toLowerCase()
    elementCheck = arrayChecker(inputVal)
  }
  return inputVal
}

function computerChoice() {
  return choices[Math.floor(Math.random() * choices.length)]
}

function arrayChecker(validPram) {
  return choices.includes(validPram)
}

function winnerConfirmation(player, ai) {
  if (player === ai) {
    return "Draw"
  } else if (
    (player === "bato" && ai === "gunting") ||
    (player === "gunting" && ai === "papel") ||
    (player === "papel" && ai === "bato")
  ) {
    return "Player"
  } else {
    return "Computer"
  }
}

function showResult() {
  let user = winnersLog.filter((element) => element == "Player").length
  let computer = winnersLog.filter((element) => element == "Computer").length
  let tie = winnersLog.filter((element) => element == "Draw").length
  console.log("Result:")
  console.log("Player Win" + " " + user)
  console.log("Computer Win" + " " + computer)
  console.log("Draw Round" + " " + tie)
}

function winnerPerRounds(playerPick, computerPick, win, round) {
  console.log("Round:" + " " + round)
  console.log("Player Choices:" + " " + playerPick)
  console.log("Computer Choices:" + " " + computerPick)
  console.log("Winner:" + " " + win)
  console.log("====================================")
}
