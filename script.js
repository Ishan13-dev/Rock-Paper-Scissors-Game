const hand = ["rock", "paper", "scissors"];

let humanScore = 0;
let computerScore = 0;
let uiRoundsPlayed = 0;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * hand.length);
  return hand[randomIndex];
}

function getHumanChoice() {
  const input = prompt("Enter rock, paper, or scissors:");
  return input ? input.trim().toLowerCase() : "";
}

function playRound(humanChoice, computerChoice) {
  const human = humanChoice.toLowerCase();
  const computer = computerChoice.toLowerCase();

  let result;

  if (human === computer) {
    result = "It's a tie!";
  } else if (
    (human === "rock" && computer === "scissors") ||
    (human === "paper" && computer === "rock") ||
    (human === "scissors" && computer === "paper")
  ) {
    humanScore++;
    result = `You win! ${human} beats ${computer}`;
  } else {
    computerScore++;
    result = `You lose! ${computer} beats ${human}`;
  }

  console.log(result);
  return result;
}

function playGame() {
  humanScore = 0;
  computerScore = 0;

  for (let i = 0; i < 3; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }

  if (humanScore > computerScore) {
    return "You win the game!";
  } else if (computerScore > humanScore) {
    return "You lose the game!";
  } else {
    return "It's a tie game!";
  }
}

// UI wiring (runs safely when DOM elements exist)
document.addEventListener("DOMContentLoaded", () => {
  const rockBtn = document.getElementById("rock-btn");
  const paperBtn = document.getElementById("paper-btn");
  const scissorsBtn = document.getElementById("scissors-btn");
  const resetBtn = document.getElementById("reset-btn");

  if (!rockBtn || !paperBtn || !scissorsBtn || !resetBtn) return;

  function handleUiChoice(humanChoice) {
    if (uiRoundsPlayed >= 3) return;

    const computerChoice = getComputerChoice();
    const roundMessage = playRound(humanChoice, computerChoice);
    uiRoundsPlayed++;

    document.getElementById("human-score").textContent = humanScore;
    document.getElementById("computer-score").textContent = computerScore;

    const resultBox = document.getElementById("result-box");
    const roundIndicator = document.getElementById("round-indicator");

    if (uiRoundsPlayed < 3) {
      roundIndicator.textContent = `Round ${uiRoundsPlayed} of 3 completed`;
      resultBox.innerHTML = `
        <span style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 4px;">
          You chose <strong style="color: #38bdf8;">${humanChoice}</strong> · Computer chose <strong style="color: #f472b6;">${computerChoice}</strong>
        </span>
        <strong style="font-size: 1.1rem;">${roundMessage}</strong>
      `;
    } else {
      let finalMessage = "It's a tie game!";
      let finalColor = "#facc15";

      if (humanScore > computerScore) {
        finalMessage = "You win the game!";
        finalColor = "#4ade80";
      } else if (computerScore > humanScore) {
        finalMessage = "You lose the game!";
        finalColor = "#f87171";
      }

      roundIndicator.textContent = "Game Over (3/3 Rounds)";
      resultBox.innerHTML = `
        <span style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 4px;">${roundMessage}</span>
        <strong style="font-size: 1.25rem; color: ${finalColor};">${finalMessage}</strong>
      `;

      document.querySelectorAll(".choice-btn").forEach((btn) => {
        btn.disabled = true;
      });
      resetBtn.style.display = "inline-block";
    }
  }

  function resetUiGame() {
    humanScore = 0;
    computerScore = 0;
    uiRoundsPlayed = 0;

    document.getElementById("human-score").textContent = "0";
    document.getElementById("computer-score").textContent = "0";
    document.getElementById("round-indicator").textContent = "Best of 3 Rounds — Make your move!";
    document.getElementById("result-box").innerHTML =
      '<span style="color: #94a3b8; font-size: 0.95rem;">Choose an option above to start Round 1</span>';

    document.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.disabled = false;
    });
    resetBtn.style.display = "none";
  }

  rockBtn.addEventListener("click", () => handleUiChoice("rock"));
  paperBtn.addEventListener("click", () => handleUiChoice("paper"));
  scissorsBtn.addEventListener("click", () => handleUiChoice("scissors"));
  resetBtn.addEventListener("click", resetUiGame);
});
