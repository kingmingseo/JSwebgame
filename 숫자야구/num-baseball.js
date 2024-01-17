const $input = document.querySelector('#input')
const $form = document.querySelector('#form')
const $logs = document.querySelector('#logs')
let out = 0;
const numbers = []
for (let n = 1; n < 10; n++) {
  numbers.push(n)
}

const answer = []
for (let n = 0; n < 4; n++) {
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}

console.log(answer)

const tries = []
function checkInput(input) {
  if (input.length !== 4) {
    return alert('4자리 숫자를 입력해주세요')
  }
  if (new Set(input).size !== 4) {
    return alert('중복된 숫자가 있습니다')
  }
  if (tries.includes(input)) {
    return alert('이미 시도한 값입니다 ')
  }
  return true;
}
$form.addEventListener('submit', (e) => {
  e.preventDefault()
  const value = $input.value;
  $input.value = '';
  if (!checkInput(value)) { //입력값 문제 있음
    return;
  }
  if (answer.join('') === value) {
    $logs.textContent = '홈런!'
    return;
  }
  if (tries.length >= 9) {
    const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
    $logs.appendChild(message);
    return;
  }
  //스트라이크 볼 검사해서 힌트주기
  let strike = 0;
  let ball = 0;
  for(let i =0; i < answer.length; i++){
    const index = value.indexOf(answer[i]);
    if(index > -1){
      if(index === i ){
        strike += 1
      }
      else{
        ball += 1;
      }
    }
  }
  answer.forEach((element,i)=>{
    const index = value.indexOf(element);
    if(index > -1 && index === i){
      strike+=1
    }
    else if(index>-1){
      ball+=1;
    }
  })
  if (strike === 0 && ball === 0 ){
    out+=1
    if(out === 3){
      const message = document.createTextNode(`3아웃 패배! 정답은 ${answer.join('')}`);
      $logs.appendChild(message);
      return;
    }
  }

  $logs.append(`${value} : ${strike} 스트라이크 ${ball} 볼 ${out}아웃` , document.createElement('br'))
  tries.push(value);


})