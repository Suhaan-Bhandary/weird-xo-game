const EMPTY_CELL_MARK = " ";

const PLAYER_ONE = 1;
const PLAYER_ONE_MARK = "X";

const PLAYER_TWO = -1;
const PLAYER_TWO_MARK = "O";

let currentPlayer = PLAYER_ONE;
let isGameEnded = false;

let playerOneMoves = [];
let playerTwoMoves = [];

const grid = [
  [EMPTY_CELL_MARK, EMPTY_CELL_MARK, EMPTY_CELL_MARK],
  [EMPTY_CELL_MARK, EMPTY_CELL_MARK, EMPTY_CELL_MARK],
  [EMPTY_CELL_MARK, EMPTY_CELL_MARK, EMPTY_CELL_MARK],
];

const handleWrongMove = () => {
  alert("Please Play a valid move");
};

const getGameStatus = (grid) => {
  // check rows
  for (let row = 0; row < 3; row++) {
    if (
      grid[row][0] != EMPTY_CELL_MARK &&
      grid[row][0] == grid[row][1] &&
      grid[row][0] == grid[row][2]
    ) {
      return grid[row][0];
    }
  }

  // check cols
  for (let col = 0; col < 3; col++) {
    if (
      grid[0][col] != EMPTY_CELL_MARK &&
      grid[0][col] == grid[1][col] &&
      grid[0][col] == grid[2][col]
    ) {
      return grid[0][col];
    }
  }

  // check diagonal
  if (
    grid[0][0] != EMPTY_CELL_MARK &&
    grid[0][0] == grid[1][1] &&
    grid[0][0] == grid[2][2]
  ) {
    return grid[0][0];
  }

  // check secondary diagonal
  if (
    grid[0][2] != EMPTY_CELL_MARK &&
    grid[0][2] == grid[1][1] &&
    grid[0][2] == grid[2][0]
  ) {
    return grid[0][2];
  }

  return null;
};

const highlightWin = (color) => {
  // check rows
  for (let row = 0; row < 3; row++) {
    if (
      grid[row][0] != EMPTY_CELL_MARK &&
      grid[row][0] == grid[row][1] &&
      grid[row][0] == grid[row][2]
    ) {
      document.getElementById(`cell-${row}-${0}`).style.color = color;
      document.getElementById(`cell-${row}-${1}`).style.color = color;
      document.getElementById(`cell-${row}-${2}`).style.color = color;
      return;
    }
  }

  // check cols
  for (let col = 0; col < 3; col++) {
    if (
      grid[0][col] != EMPTY_CELL_MARK &&
      grid[0][col] == grid[1][col] &&
      grid[0][col] == grid[2][col]
    ) {
      document.getElementById(`cell-${0}-${col}`).style.color = color;
      document.getElementById(`cell-${1}-${col}`).style.color = color;
      document.getElementById(`cell-${2}-${col}`).style.color = color;
      return;
    }
  }

  // check diagonal
  if (
    grid[0][0] != EMPTY_CELL_MARK &&
    grid[0][0] == grid[1][1] &&
    grid[0][0] == grid[2][2]
  ) {
    document.getElementById(`cell-${0}-${0}`).style.color = color;
    document.getElementById(`cell-${1}-${1}`).style.color = color;
    document.getElementById(`cell-${2}-${2}`).style.color = color;
    return;
  }

  // check secondary diagonal
  if (
    grid[0][2] != EMPTY_CELL_MARK &&
    grid[0][2] == grid[1][1] &&
    grid[0][2] == grid[2][0]
  ) {
    document.getElementById(`cell-${0}-${2}`).style.color = color;
    document.getElementById(`cell-${1}-${1}`).style.color = color;
    document.getElementById(`cell-${2}-${0}`).style.color = color;
    return;
  }
};

const handleGameOver = (player_won) => {
  isGameEnded = true;
  document.getElementById("gameOverContainer").classList.add("active");

  const gameOverText = document.getElementById("gameOverText");
  if (player_won == PLAYER_ONE_MARK) {
    highlightWin("green");
    gameOverText.textContent = "Player One Won";
  } else {
    highlightWin("red");
    gameOverText.textContent = "Player Two Won";
  }
};

const handlePlay = (row, col) => {
  if (currentPlayer == PLAYER_ONE) {
    playerOneMoves.push({ row, col });
    grid[row][col] = PLAYER_ONE_MARK;

    if (playerOneMoves.length > 3) {
      const oldMove = playerOneMoves.shift();
      grid[oldMove.row][oldMove.col] = EMPTY_CELL_MARK;
    }
  } else {
    playerTwoMoves.push({ row, col });
    grid[row][col] = PLAYER_TWO_MARK;

    if (playerTwoMoves.length > 3) {
      const oldMove = playerTwoMoves.shift();
      grid[oldMove.row][oldMove.col] = EMPTY_CELL_MARK;
    }
  }

  // make the other play play
  currentPlayer = -currentPlayer;

  // Rerender the grid
  renderGrid();

  // Check if player won or not
  const gameStatus = getGameStatus(grid);
  if (gameStatus) handleGameOver(gameStatus);
};

const handleCellClick = (row, col) => {
  if (isGameEnded) return;

  // Check if move is valid or not
  if (grid[row][col] != EMPTY_CELL_MARK) {
    handleWrongMove(row, col);
    return;
  }

  handlePlay(row, col);
};

const renderGrid = () => {
  const title = document.getElementById("title");
  title.textContent =
    currentPlayer === PLAYER_ONE
      ? "Tic Tac Toe(Player One)"
      : "Tic Tac Toe(Player Two)";

  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";

  const tbody = document.createElement("tbody");

  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");
      cell.textContent = grid[i][j];
      cell.id = `cell-${i}-${j}`;
      cell.addEventListener("click", () => handleCellClick(i, j));

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  gridElement.appendChild(tbody);
};

const restartGame = () => {
  playerOneMoves = [];
  playerTwoMoves = [];

  currentPlayer = PLAYER_ONE;
  isGameEnded = false;
  document.getElementById("gameOverContainer").classList.remove("active");

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid[i][j] = EMPTY_CELL_MARK;
    }
  }

  renderGrid();
};

function main() {
  document.getElementById("restart").addEventListener("click", restartGame);
  renderGrid();
}

main();
