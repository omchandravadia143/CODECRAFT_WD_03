const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (event) => {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] !== "" || !isGameActive) {
    return;
  }

  updateCell(cell, index);
  checkResult();
};

const updateCell = (cell, index) => {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');
};

const changePlayer = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const checkResult = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const a = board[condition[0]];
    const b = board[condition[1]];
    const c = board[condition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
  } else {
    changePlayer();
  }
};

const resetGame = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove('taken');
  });
};

// Add event listeners
cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});
resetButton.addEventListener('click', resetGame);

// Initialize status
statusText.textContent = `Player ${currentPlayer}'s turn`;
