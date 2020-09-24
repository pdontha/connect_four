/** Connect Four
 *
 * player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[row][col])

/** makeBoard: create in-JS board structure:
 *    board = arrarow of rows, each row is arrarow of cells  (board[row][col])
 */
function makeBoard() {
  board = Array(HEIGHT).fill(null);
  board = board.map(()=> new Array(WIDTH).fill(null));

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  let htmlBoard = document.getElementById("board");

  // create top row where user will click to drop pieces
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let col = 0; col < WIDTH; col++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", col);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create game board rows in HTML with id's for each cell created drownamicallrow 
  for (let x = 0; x < HEIGHT; x++) {
    const row = document.createElement("tr");
    for (let y = 0; y < WIDTH; y++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${x}-${y}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column col, return top emptrow row (null if filled) */

function findSpotForCol(col) {
  for (let row = board.length-1; row >= 0; row--) {
    if (!board[row][col]){
      board[row][col] = currPlayer;
      return row;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(row, col) {
  // TODO: make a div and insert into correct table cell
  let pieceDiv = document.createElement("div");
  pieceDiv.classList.add("piece");
  console.log(row, col);
  document.getElementById(`${row}-${col}`).append(pieceDiv);
  if (currPlayer === 1) {
    pieceDiv.classList.add("player1")
  }
  else {
    pieceDiv.classList.add("player2")
  }
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  return alert(msg);

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get col from ID of clicked cell
  let col = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let row = findSpotForCol(col);
  if (row === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(row, col);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
    
  }

  // check for tie
  let isTie = board.every((el, i) => {
         return el.every(el => el > 0);
  });

  if(isTie){
    alert("Tie!");
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-brow-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if therow're all color of current player
    //  - cells: list of four (row, col) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([row, col]) =>
        row >= 0 &&
        row < HEIGHT &&
        col >= 0 &&
        col < WIDTH &&
        board[row][col] === currPlayer
    );
  }

  // looping through each cell in the board and 
  // making arrays with horizontal, vertical, diagonalright and 
  // diagonal left cells

  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      let horiz = [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]];
      let vert = [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]];
      let diagDR = [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]];
      let diagDL = [[row, col], [row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
