const gameTiles = document.querySelectorAll('.tile');
const gameBoard = document.querySelector('#game-board');

gameState = [
    [gameTiles[0], gameTiles[1], gameTiles[2]],
    [gameTiles[3], gameTiles[4], gameTiles[5]],
    [gameTiles[6], gameTiles[7], gameTiles[8]]
];

const array = [0, 1, 2, 3, 4, 5, 6, 7];
const shuffledArray = array.sort((a, b) => 0.5 - Math.random());

for (let i = 0; i < shuffledArray.length; i++) {
  let x = Math.floor(i / 3);
  let y = i % 3;
  gameState[x][y].innerText = shuffledArray[i];
}

function render(gameBoard, gameState) {
  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      let rowNumber = Math.floor(column.innerText / 3);
      let columnNumber = column.innerText % 3;

      column.style.top = `${rowIndex * 100}px`;
      column.style.left = `${columnIndex * 100}px`;

      column.style['background-position-y'] = `-${rowNumber * 100}px`;
      column.style['background-position-x'] = `-${columnNumber * 100}px`;

      gameBoard.appendChild(column);
    })
  })
}

function moveElement(element1, element2) {
  const tempTop = element1.style.top;
  const tempLeft = element1.style.left;

  element1.style.top = element2.style.top;
  element1.style.left = element2.style.left;

  element2.style.top = tempTop;
  element2.style.left = tempLeft;
}

render(gameBoard, gameState);

gameBoard.addEventListener('click', (event) => {
  const target = event.target;
  let x, y;
  let emptyX, emptyY

  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column == target) {
        x = rowIndex;
        y = columnIndex;
      }
    });
  });

  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column.innerText == "") {
        emptyX = rowIndex;
        emptyY = columnIndex;
      }
    });
  });

  if ((y == emptyY) && (emptyX == x - 1 || emptyX == x + 1) ||
      (x == emptyX) && (emptyY == y - 1 || emptyY == y + 1)) {

      moveElement(gameState[x][y], gameState[emptyX][emptyY])

      const temp = gameState[x][y];
      gameState[x][y] = gameState[emptyX][emptyY];
      gameState[emptyX][emptyY] = temp;
  }
});
