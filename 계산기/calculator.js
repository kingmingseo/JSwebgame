let numOne = '';
let numTwo = '';
let operator = '';

const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');
const clickNum = (event) => {
  console.log(event.target.textContent);
  if (!operator) { // 첫번째 숫자가 눌렸을 때 
    numOne += event.target.textContent;
    $result.value += event.target.textContent;
    return;
  }

  $result.value = '';


  numTwo += event.target.textContent;
  $result.value += event.target.textContent;
}

const clickOperator = (op) => () => {
  if (numOne && numTwo) { // 계산을 이어서 하고자 할 때 
    calculate()
    numOne = $result.value
    numTwo = '';
    operator = op;
    $operator.value = op;

  }
  if (numOne) { // numOne을 입력하고 연산자를 클릭했을 때 
    operator = op;
    $operator.value = op;
  }
  else { // numOne 조차 입력 안했을 때 
    alert('숫자를 먼저 입력하세요 ')
  }
}

const calculate = () => {
  if (numTwo) {
    let num1 = Number(numOne);
    let num2 = Number(numTwo);
    switch (operator) {
      case ('+'):
        $result.value = num1 + num2;
        break;
      case ('-'):
        $result.value = num1 - num2;
        break;
      case ('/'):
        $result.value = num1 / num2;
        break;
      case ('*'):
        $result.value = num1 * num2;
        break;
    }
  }
  numOne = $result.value
  numTwo = ''
}



document.querySelectorAll('.num').forEach(element => {
  element.addEventListener('click', clickNum)
});


document.querySelector('#plus').addEventListener('click', clickOperator('+'))
document.querySelector('#minus').addEventListener('click', clickOperator('-'))
document.querySelector('#divide').addEventListener('click', clickOperator('/'))
document.querySelector('#multiply').addEventListener('click', clickOperator('*'))
document.querySelector('#calculate').addEventListener('click', calculate)
document.querySelector('#clear').addEventListener('click', () => {
  numOne = ''
  numTwo = ''
  operator = ''
  $operator.value = ''
  $result.value = ''
})


