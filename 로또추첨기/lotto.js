const candidate = Array(45).fill().map((element, index) => index + 1);
const shuffle = [];

while (candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length)
  const spliceArray = candidate.splice(random, 1);
  const value = spliceArray[0]
  shuffle.push(value)
}

const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];
console.log(winBalls, bonus);

const colorize = (num) =>{
  if (num < 10){
    return "red";
  }
  else if ( num <20){
    return "orange";
  }
  else if ( num <30){
    return "yellow";
  }
  else if ( num <40){
    return "blue";
  }
  else {
    return "green";
  }

}


const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');
for(let i=0; i<5; i++){
  setTimeout(()=>{
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = winBalls[i]
    let color = colorize(winBalls[i])
    if(["red","blue","green"].includes(color)){
      $ball.style.color = "white";
    }
    $ball.style.backgroundColor = color;

    $result.appendChild($ball)
  },1000*(i+1))
}
setTimeout(()=>{
  const $ball = document.createElement('div');
  $ball.className = 'ball';
  $ball.textContent = bonus
  let color = colorize(bonus)
  $ball.style.backgroundColor = color;
  $bonus.appendChild($ball)
},6000)
