# [웹게임]숫자야구

작성일시: 2024년 1월 16일 오후 3:27
복습: No

`Math.random()` 은 0에서 부터 1 미만의 숫자를 랜덤으로 (완전 무작위는 아님) 반환하는 함수이다.

`Math.random()*9 +1` 을 하면 1에서부터 10미만의 숫자를 랜덤으로 반환하게 할 수 있다.

자연수로 반환하길 원한다면 

`Math.floor(Math.random()*9 +1)` 을 사용하면 된다.

배열의 **join()함수**

`let temp = [3,1,4,6]`  배열이 있을 때 `temp.join(’’)` 하면 join 안의 문자로 배열의 원소를 구분 해준다 위와 같은 상황에는 3146이 된다.

반대로 문자열을 **split()함수**를 통해서 배열로 변환이 가능하다

`‘3146’.split(’,’)`를 하면 [3,1,4,6]의 배열을 생성할 수 있다. 

글자를 한 줄씩 추가하는 스킬

`element.innerHTML = $logs.textContent + ‘<br/>추가하고싶은말’`

하지만 innerHTML은 식이 복잡해지는 경향이 있다.

조금 더 직관적으로 한 줄씩 추가하자면

```jsx
const message = document.createTextNode(’하고싶은 말’);

const br = document.createElement(’br)

$logs.appendChild(message);

$logs.appendChild(br);
```

append() 함수

append() 함수는 지정된 요소의 자식 노드 리스트의 끝에 하나 이상의 노드 또는 DOMString 객체를 추가합니다. 

```jsx
$logs.append(`${value} : ${strike} 스트라이크 ${ball} 볼`, document.createElement('br'))
```