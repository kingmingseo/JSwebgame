# [웹게임]틱택토

작성일시: 2024년 1월 18일 오후 1:03
복습: No

HTML 태그는 자바스크립트로 만들어 낼 수 있다.

```jsx
const data = [];

for(let i = 0; i<3; i++){
  data.push([]);
}
const $table = document.createElement('table');
for (let i = 0; i<3; i++){
  const $tr = document.createElement('tr')
  for(let j=0; j<3; j++){
    const $td = document.createElement('td')
    $tr.append($td)
  }
  $table.append($tr);
}

document.body.append($table)
```

위와 같이 자바스크립트로 이차원 배열을 만들고 자바스크립트의 이차원 배열 데이터에 대응하게 body태그의 자식으로 이차원 테이블을 만들어 append하는 코드이다.

### 구조 분해 할당

```jsx
const arr = [1,2,3,4,5]
const [a,b,c,d,e] = arr

// a=1 b=2 c=3 d=4 e=5
```

```jsx
cosnt obj = {a:1, b:2};
const {a,b} = obj // 다음 두 줄을 이렇게 한줄로 표현 가능

const a= obj.a;
const b = obj.b;
```

구조분해 할당 연습문제 

```jsx
const obj {
	a : 'hello',
	b : {
		c: 'hi',
		d: {e : 'wow'},
	},
}

//아래와 같은 경우 새로운 객체를 가지는 변수는 구조분해 할당이 안된다
const {a, b :{c, d :{e} } = obj
const a = obj.a
const c = obj.b.c
const e = obj.b.d.e

//b와 d를 구조분해 할당해보자
const {a,b} =obj
const {d:{e}} = b
```

### 이벤트 버블링, 이벤트 캡쳐링

```jsx
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr')
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td')
    cells.push($td);
    //$td.addEventListener('click', changeTurn)
    $tr.append($td)
  }
  rows.push(cells);
  $table.append($tr);
}

$table.addEventListener('click', changeTurn)
```

이벤트 버블링이란 이벤트발생이 html태그를 타고 상위 객체로 이동하는 것이다.
위 코드는 원래 이벤트리스너를 table태그의 가장 하위태그인 td태그에 붙어두었는데 수정해서 table에 리스너를 붙인 것이다. 이렇게 해도 동작한다.

실제 event 발생은 td에서 하지만 td를 타고 tr을 타고 table까지 이벤트가 상위객체로 타고 올라오기 때문이다. 

```jsx
const changeTurn = (event) => {
  if (event.target.textContent) {
    return;
  }
  event.target.textContent = turn;
  turn = turn === 'O' ? 'X' : 'O';
}
```

changeTurn 함수에 전달된 `event.target`은 실제로 클릭 된 td를 의미하며

이벤트리스너를 달아둔 타겟을 원한다면 `event.currentTarget`을 이용 하면 된다.

이 현상을 막고싶다면 event.stopPropagation() 함수를 사용하면 된다.

반대의 상황을 이벤트 캡쳐링이라고 한다.

이벤트 캡쳐링은 부모의 태그를 클릭에서 부모 태그에 이벤트가 발생했을 때 이벤트가 자식에게 까지 전해지는 것을 뜻한다. 

`$table.addEventListener('click', changeTurn, **false**)`

보통 세번째 인수를 통해서 캡쳐링을  할 것인지 안 할 것인지 조절한다.

기본값은 false로 캡쳐링이 제한되어있다.

**왜 이벤트 버블링이 유용한가?**

만약 td태그안에 작은 span태그가 존재한다고 가정하자.  그리고 크게 신경쓰는 것 없이 td태그를 클릭했다고  생각했는데 알고보니 td태그의 자식태그인 span태그에 클릭이 되어서 원하는 이벤트가 발생하지 않을 수 있다. 

이벤트 버블링이 존재했다면 span태그의 이벤트가 td태그로 이어지고  td태그의 부모까지 이어지며 올바른 동작을 했을 것이다. 

**td에는 cellIndex, tr에는 rowIndex가 기본적으로 제공된다!**

```jsx
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

//event가 발생한 객체가 td라면 이런식으로 인덱스를 가져올 수 있다.
//반대로 children을 하면 자식객체를 가져올 수 있다
const $temp = document.body.children 
```

`Array.from(유사배열)` 코드는 유사배열을 배열로 바꿔주는 코드이다. 

forEach()문법이나 여러 배열의 메소드를 사용할 수 있게 해준다. 

### **every와 some, flat 메소드 알아보기**

flat()메소드는 이차원 배열을 일차원으로 만들어 주는 메소드이다

```jsx
const temp = [[td,td,td],[td,td]];
temp.flat() // [td,td,td,td,td]
```

every() 메소드, some()메소 - 1차원 배열에서만 사용이 가능하다

```jsx
//틱택토 코드 참고
rows.flat().every((td)=>td.textcontent) // 9칸 다 조사하면서 모두 차있어야 true
rows.flat().every((td)=>!td.textcontent) // 9칸 모두 비어있어야 true

rows.flat().some((td)=>td.textcontent) // 9칸 중 하나라도 있으면 true
rows.flat().some((td)=>!td.textcontent) // 9칸 중 하나라도 비어있으면 true 
```

위 메소드들은 반복을 돌면서 조건에서 하나라도 맞지 않으면 바로 코드실행을 중지한다. forEach에서 break나 return을 사용할 수 없는 문제를 해결한다.