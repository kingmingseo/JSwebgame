# [웹게임] 계산기

작성일시: 2024년 1월 16일 오전 11:34
복습: No

HTML을 작성할 하면서 들여쓰기를 하고 가독성을 높이기 위해 줄바꿈을 하는 과정에서도 공백이나 예상치 못한 마진이 발생한다. 

아래는 예시이다

```jsx
<div class="row">
    <button id="num-7">7</button>
		<button id="num-8">8</button>
    <button id="num-9">9</button>
    <button id="plus">+</button>
</div> 

/*--------------------------------*/

<div class="row">
    <button id="num-7">7</button><button id="num-8">8</button><button id="num-9">9</button><button id="plus">+</button>
</div> 
```

주석으로 코드를 구분해 두었다.

위 코드의 버튼 간격이 아래 코드의 버튼 간격보다 더 넓게 형성 된다.

---

css속성의 `box-sizing : border-box` 는 width와 height의 크기가 border 의 경계까지 포함하는 크기로 사이즈를 설정하는 속성이다. 

input 태그에 readonly 속성을 넣으면 입력이 불가능하고 단순히 display용으로 사용할 수 있다. `<input type=”text readonly>`

이벤트리스너 함수의 두 번째 매개변수에는 함수의 리턴 값이 아니라 함수 그 자체가 위치 해야 한다. 

```jsx
const clickNum = (number) => {
  return () => {
    if (operator) {
      numOne = number;
    }
    else {
      numTwo = number;
    }
  }
}

// return과 중괄호가 만나면 생략이 가능하다. 
const clickNum = (number) => () => {
  if (operator) {
    numOne = number;
  }
  else {
    numTwo = number;
  }
}

document.querySelector('#num-0').addEventListener('click', clickNum('0'))
```

그래서 이런식으로 이벤트리스너 함수의 콜백함수에 인수를 정의하면서 clickNum함수의 return값을 함수로 지정하면 이벤트리스너 함수의 콜백함수 자리에 함수가 올바르게 위치 할 수 있다. 

### if 중첩문 지우는 방법

1. if문 다음에 나오는 공통된 절차를 각 분기점 내부에 넣는다
2. 분기점에서 짧은 절차부터 실행하게 if문을 작성한다
3. 짧은 절차가 끝나면 return(함수 내부의 경우)이나 break(반복문의 경우)로 중단한다
4. else를 제거한다 ( 이때 중첩하나가 제거된다)
5. 

예시코드

```jsx
if (operator) {
    if(!numTwo){
      $result.value = '';
    }
    numTwo += event.target.textContent;
  }
else {
  numOne += event.target.textContent;
}

  $result.value += event.target.textContent;
}
```

1. if문 다음에 나오는 공통된 절차를 각 분기점 내부에 넣는다

```jsx
if (operator) {
  if(!numTwo){
    $result.value = '';
  }
  numTwo += event.target.textContent;
	**$result.value += event.target.textContent;**
}
else {
  numOne += event.target.textContent;
	**$result.value += event.target.textContent;**
}

```

1. 분기점에서 짧은 절차부터 실행하게 if문을 작성한다

```jsx
if (**!operator**) {
	**numOne += event.target.textContent;
	$result.value += event.target.textContent;**
}
else{
	**if(!numTwo){
    $result.value = '';
  }
  numTwo += event.target.textContent;
	$result.value += event.target.textContent;**
}

```

1. 짧은 절차가 끝나면 return(함수 내부의 경우)이나 break(반복문의 경우)로 중단한다

```jsx
if (!operator) {
	numOne += event.target.textContent;
	$result.value += event.target.textContent;
	return;
}
else{
	if(!numTwo){
    $result.value = '';
  }
  numTwo += event.target.textContent;
	$result.value += event.target.textContent;
}
```

1. else를 제거한다 ( 이때 중첩하나가 제거된다)

```jsx
if (!operator) {
	numOne += event.target.textContent;
	$result.value += event.target.textContent;
	return;
}
if(!numTwo){
    $result.value = '';
 }
 numTwo += event.target.textContent;
$result.value += event.target.textContent;

```

---

### 연속 계산 가능하게 하기

```jsx
let numOne = '';
let numTwo = '';
let operator = '';

const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');
const clickNum = (event) => {
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
```