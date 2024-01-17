# 웹게임[로또추첨기]

작성일시: 2024년 1월 17일 오후 1:07
복습: No

### **피셔에이츠 셔플**

기존 숫자야구에서 랜덤으로 정답숫자 4개를 뽑은 것과는 다른 알고리즘이다.

숫자야구에서는 1부터 9까지의 숫자를 배열에 담은 상태에서 4개의 랜덤 인덱스로 숫자 4개를 추츨하는 방법이었다.

이번 로또 추첨기에서 사용할 피셔에이츠 셔플은 1부터 45개까지의 숫자를 배열에 담은 뒤 필요한 숫자만큼만 앞에서 잘라서 가져오는 것이다. 

```jsx
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
```

**slice() 메소드**

배열의 필요한 부분만큼 자르는 메소드 `slice(start, end)`

start부분은 포함하며 end부분은 포함하지 않는다

원본배열이 변하지 않는다. (얕은 복사개념)

end 부분에 음수도 들어갈 수 있다. -1은 뒤에서 첫번째를 의미한다.

 

**배열 sort()메소드 (원본 배열에 변화가 생긴다)**

```jsx
array.sort((a,b)⇒a-b) // 오름차순 배열**

array.sort((a,b)⇒b-a) // 내림차순 배열**

array.sort((a,b) => a.localeComapte(b)) 사전순 오름차순 정렬

array.sort((a,b) => b.localeComapte(a)) 사전순 내차순 정렬
원본에 변화를 주기 싫다면 
array.slice().sort((a,b)⇒a-b);
```

setTimeout() 함수 사용

```jsx
setTimeout(()=>{
  const $ball = document.createElement('div');
  $ball.className = 'ball';
  $ball.textContent = winBalls[0]
  $result.appendChild($ball)
},1000)

// 첫번째 인수로는 함수가 들어가며 두번째 인수로는 'ms' 단위로 몇 ms초 뒤에 함수가 동작할 것인지를 의미한다. 
```

<참고> 타이머의 시간은 정확하지 않다. 

자바스크립트는 기본적으로 한번에 한 가지의 일만 수행할 수 있다.

이미 많은 일을 하고 있다면 설정한 시간이 되어도 setTimeout에서 지정된 작업이 수행되지 않는다. 

### 블록, 함수 스코프, 클로저 문제

**var 과 let의 차이 이해하기 (var 더 이상 쓸 필요 없다! )**

var은 함수 스코프를 가진다.  함수 바깥에서는 접근 불가능 

let과 const는 블록 스코프를 가진다. 블록 바깥에서는 접근 불가능

```jsx
for (var i =0; i< winBalls.length; i++) {
	setTimeout(()=>{
	console.log(winBalls[i], i);
	drawBall(winBalls[i],$esult)
	},100 * (i+1));
}
```

setTimeout은 비동기이고 for문은 동기이다.

직관적으로 생각하면 for문의 var i 가 이미 6이 되어버린 시점에서 setTimeout의 동작이 실행 되기 때문에 winBalls[6]으로 실행되고 winBalls의 6번째 인덱스는 unidentified이기 때문에 코드가 정상적으로 실행되지 않는 것이다 .

**왜 let일때는 이러한 문제가 발생하지 않는가?**

let은 블록스코프이기 때문에 하나의 블록마다 i가 고정된다. 이것보 블록 스코프의 특성이다. setTimeout의 콜백함수내부의 i도 setTimeout을 호출 할 때의 i와 같은 값이 들어가게 된다 .

**그럼 var을 쓰면서 어떻게 이런 문제를 방지할 수 있을까?**

⇒ **클로저를 사용한다** 

```jsx
for (var i =0; i< winBalls.length; i++) {
	(function(j){
	setTimeout(()=>{
	console.log(winBalls[i], i);
	drawBall(winBalls[i],$esult)
	},100 * (i+1));})(i)
}
```

var의 i가 function의 인수 i에 들어가서 매개변수 j로 전달된다

함수스코프를 가진 var이 내부에 함수가 있으므로 하나의 차단 막이 생긴 것과 같다. 

j가 함수 안에 갇혀서 반복문 하나의 loop마다  i를 올바르게 가리킬 수 있게 된다. 

클로저란? 함수와 함수 바깥에 있는 변수의 관계를 말한다. 

이를 함수와 함수 안에 있는 변수로 만들어줘서 문제를 해결

### 셀프체크 공 색칠하기

`태그.style.CSS속성 = 값;` 을 하면 태그에 css속성이 적용된다.