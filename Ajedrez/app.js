const chessboard = document.getElementById('chessboard');
const turnIndicator = document.getElementById('turn');
const initialBoard = [
  ['Brook','Bknight','Bbishop','Bqueen','Bking','Bbishop','Bknight','Brook'],
  ['Bpawn','Bpawn','Bpawn','Bpawn','Bpawn','Bpawn','Bpawn','Bpawn'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['Wpawn','Wpawn','Wpawn','Wpawn','Wpawn','Wpawn','Wpawn','Wpawn'],
  ['Wrook','Wknight','Wbishop','Wqueen','Wking','Wbishop','Wknight','Wrook'],
];
// Mapa de piezas a símbolos Unicode de ajedrez
const pieceUnicode = {
  'Wking': '♔',
  'Wqueen': '♕',
  'Wrook': '♖',
  'Wbishop': '♗',
  'Wknight': '♘',
  'Wpawn': '♙',
  'Bking': '♚',
  'Bqueen': '♛',
  'Brook': '♜',
  'Bbishop': '♝',
  'Bknight': '♞',
  'Bpawn': '♟',
};
let boardState = JSON.parse(JSON.stringify(initialBoard)); // copia profunda
let selectedSquare = null;
let turn = 'W'; // W para blancas, B negras
function createBoard() {
  chessboard.innerHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      // Alternar colores
      if ((row + col) % 2 === 0) {
        square.classList.add('light');
      } else {
        square.classList.add('dark');
      }
      square.dataset.row = row;
      square.dataset.col = col;
      const piece = boardState[row][col];
      if (piece) {
        const pieceEl = document.createElement('span');
        pieceEl.classList.add('piece');
        pieceEl.textContent = pieceUnicode[piece];
        square.appendChild(pieceEl);
      }

      square.addEventListener('click', () => onSquareClick(row, col));
      chessboard.appendChild(square);
    }
  }
}
function onSquareClick(row, col) {
  const piece = boardState[row][col];
  if (selectedSquare) {
    // Si seleccionamos una casilla diferente, intentar mover
    if (selectedSquare[0] === row && selectedSquare[1] === col) {
      // Desmarcar
      selectedSquare = null;
      updateBoardHighlight();
      return;
    }
    // Mover pieza sin validar reglas (simplemente se mueve si es turno)
    const selectedPiece = boardState[selectedSquare[0]][selectedSquare[1]];
    if (selectedPiece[0] === turn) {
      // Mover pieza
      boardState[row][col] = selectedPiece;
      boardState[selectedSquare[0]][selectedSquare[1]] = '';
      selectedSquare = null;
      toggleTurn();
      createBoard();
    }
  } else {
    // Seleccionar pieza si es turno
    if (piece && piece[0] === turn) {
      selectedSquare = [row, col];
      updateBoardHighlight();
    }
  }
}
function updateBoardHighlight() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(sq => sq.classList.remove('selected'));
  if (selectedSquare) {
    const selector = `.square[data-row="${selectedSquare[0]}"][data-col="${selectedSquare[1]}"]`;
    const el = document.querySelector(selector);
    if(el) el.classList.add('selected');
  }
}
function toggleTurn() {
  turn = turn === 'W' ? 'B' : 'W';
  turnIndicator.textContent = `Turno: ${turn === 'W' ? 'Blancas' : 'Negras'}`;
}
createBoard();