const choices = ["bato", "papel", "gunting"]

function game() {
  for (let i = 1; i <= 5; i++) {
    playRound()
  }
}

function playRound() {
  const playerSelect = playerChoice()
  const computerSelect = computerChoice()
  const winPerRound = winnersLog(playerSelect, computerSelect)
  console.log(playerSelect)
  console.log(computerSelect)
  console.log(winPerRound)
}

function playerChoice() {
  let inputVal = prompt("Type: Bato, Papel, or Gunting")
  while (inputVal === null) {
    inputVal = prompt("Please type: Bato, Papel, or Gunting")
  }
  inputVal = inputVal.toLowerCase()
  let validCheck = validInput(inputVal)
  while (validCheck === false) {
    inputVal = prompt("404 please type: Bato, Papel, or Gunting")
    inputVal = inputVal.toLowerCase()
    validCheck = validInput(inputVal)
  }
  return inputVal
}

function computerChoice() {
  return choices[Math.floor(Math.random() * choices.length)]
}

function validInput(validPram) {
  return choices.includes(validPram)
}

function winnersLog(player, ai) {
  if (player === ai) {
    return `Draw: ${player} and ${ai} is same`
  } else if (
    (player === "bato" && ai === "gunting") ||
    (player === "gunting" && ai === "papel") ||
    (player === "papel" && ai === "bato")
  ) {
    return `Player Win: because the ${player} beat the ${ai}`
  } else {
    return `Computer Win: because the ${ai} beat the ${player}`
  }
}
