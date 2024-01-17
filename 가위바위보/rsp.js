const $computer = document.querySelector('#computer')
const $score = document.querySelector('#score')
const $rock = document.querySelector('#rock')
const $scissors = document.querySelector('#scissors')
const $paper = document.querySelector('#paper')
const imgUrl = './rsp.png'

$computer.style.background = `url(${imgUrl}) 0 0`;
$computer.style.backgroundSize = 'auto 200px'

const rspX = {
  scissors: '0',
  rock: '-220px',
  paper: '-440px'
}

let coord = 'scissors';
const changeComputerHand = () => {
  if (coord === 'scissors') {
    coord = 'rock'

  }
  else if (coord === 'rock') {
    coord = 'paper'

  }

  else if (coord === 'paper') {
    coord = 'scissors'
  }
  $computer.style.background = `url(${imgUrl}) ${rspX[coord]} 0`;
  $computer.style.backgroundSize = 'auto 200px'
}
const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
}
let intervalId = setInterval(changeComputerHand, 50)
let clickable = true
let comScore = 0;
let myScore = 0;
const clickButton = (event) => {
  if (clickable === true) {
    clickable = false;
    clearInterval(intervalId);
    //점수 계산 및 화면 표시 
    const myChoice = event.target.textContent === '바위' ? 'rock'
      : event.target.textContent === '가위'
        ? 'scissors'
        : 'paper';
    const myTemp = scoreTable[myChoice];
    const comTemp = scoreTable[coord];
    const diff = myTemp - comTemp;

    let message;
    if (diff === 2 || diff === -1) {
      message = '승리'
      myScore += 1;
    }
    else if (diff === -2 || diff === 1) {
      message = '패배'
      comScore += 1;
    }
    else if (diff === 0) {
      message = '무승부'
    }
    $score.textContent = `${message} ${myScore}승 ${comScore}패`
    if (comScore === 3) {
      let announcement = document.createTextNode('최종패배')
      $score.appendChild(document.createElement('br'))
      $score.appendChild(announcement);
    }
    else if (myScore === 3){
      let announcement = document.createTextNode('최종승리')
      $score.appendChild(document.createElement('br'))
      $score.appendChild(announcement);
      
    }
    else{
      setTimeout(() => {
        clickable = true;
        intervalId = setInterval(changeComputerHand, 50)

      }, 1000);
    }

      
  }

}

$rock.addEventListener('click', clickButton)
$paper.addEventListener('click', clickButton)
$scissors.addEventListener('click', clickButton)