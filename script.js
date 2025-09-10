let round = 1;
let playerScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll('.choice');
const resultDiv = document.getElementById('result');
const roundSpan = document.getElementById('round');
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const playAgainBtn = document.getElementById('play-again');

choices.forEach(button => {
  button.addEventListener('click', () => {
    if (round > 5) return;

    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    updateScores(result);
    showResult(playerChoice, computerChoice, result);
    round++;
    roundSpan.textContent = round <= 5 ? round : 5;

    if (round > 5) {
      endGame();
    }
  });
});

playAgainBtn.addEventListener('click', resetGame);

function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  return options[Math.floor(Math.random() * options.length)];
}

function getResult(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'win';
  return 'lose';
}

function updateScores(result) {
  if (result === 'win') playerScore++;
  else if (result === 'lose') computerScore++;

  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
}

function showResult(player, computer, result) {
  let message = `You chose ${player}, computer chose ${computer}. `;
  if (result === 'win') message += "You win this round!";
  else if (result === 'lose') message += "You lose this round!";
  else message += "It's a draw!";
  resultDiv.textContent = message;
}

function endGame() {
  let finalMessage = '';
  if (playerScore > computerScore) finalMessage = "🎉 You won the game!";
  else if (playerScore < computerScore) finalMessage = "😞 You lost the game!";
  else finalMessage = "🤝 It's a tie!";
  resultDiv.textContent = finalMessage;
  playAgainBtn.classList.remove('hidden');
}

function resetGame() {
  round = 1;
  playerScore = 0;
  computerScore = 0;
  roundSpan.textContent = round;
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  resultDiv.textContent = '';
  playAgainBtn.classList.add('hidden');
}