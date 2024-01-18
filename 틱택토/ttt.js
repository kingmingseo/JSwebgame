const $table = document.createElement('table');
const $result = document.createElement('div');

const rows = [];
let turn = 'O'
const checkDraw = () => {
  let draw = true;
  rows.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.textContent) { // 2차원 배열을 살피면서 내가 뭘 클릭했는지 체크 
        draw = false;
      }
    });
  });
  return draw;
}
const checkWinner = (target) => {
  let rowIndex = target.parentNode.rowIndex;
  let cellIndex = target.cellIndex
  let hasWinner = false;

  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) { hasWinner = true; }
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) { hasWinner = true; }
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) { hasWinner = true; }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) { hasWinner = true; }

  return hasWinner;
}

const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);
  if (hasWinner) {
    $result.textContent = `${turn}님의 승리!`
    $table.removeEventListener('click', changeTurn)
    return
  }
  if (checkDraw()) {
    $result.textContent = `무승부`
    return
  }
  turn = turn === 'O' ? 'X' : 'O';
}
let clickable = true;
const changeTurn = (event) => {
  if (clickable) {
    clickable = false;
    if (event.target.textContent) {
      return;
    }
    event.target.textContent = turn;
    checkWinnerAndDraw(event.target)

    if (turn === 'X') {
      setTimeout(() => {
        const emptyCells = rows.flat().filter((v) => !v.textContent);
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        randomCell.textContent = 'X'
        checkWinnerAndDraw(randomCell)
        clickable = true;
      }, 2000)

    }
  }


}



for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr')
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td')
    cells.push($td);
    $tr.append($td)
  }
  rows.push(cells);
  $table.append($tr);
}
$table.addEventListener('click', changeTurn)
document.body.append($table)
document.body.append($result)