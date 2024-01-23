# [웹게임] 카드 짝맞추기

작성일시: 2024년 1월 19일 오후 10:33
복습: No

```jsx
const arr = [1,2,3]
arr.concat([1]) // arr = [1,2,3,1]
arr.concat([[1]]) // arr = [1,2,3,[1]]
```

concat은 배열 하나는 풀지만 두개부터는 풀지 않는다.

객체도 풀지 않는다.

복습 addEventListener의 콜백함수가 함수 선언문이면 

this가 addEvenListener가 붙은 태그를 의미하고 화살표 함수이면 하나 바깥의 객체를 의미한다. 

```jsx
function onClickCard(){
  this.classList.toggle('flipped'); //this 는 card를 의
  clicked.push(this);
  if(clicked.length!==2){
    return
  }
}

card.addEventListener('click', onClickCard);
```

**querySelector는 연달아서 작성할 수 있다**

```jsx
const temp = document.querySelector('head').querySelector('body')
```

toggle()메소드

```jsx
this.classList.toggle('flipped');
//toggle메소드는 이미 존재하면 제거하고 존재하지 않으면 추가한다.
```

### 이벤트 루프와 호출스택

![image](https://github.com/kingmingseo/JSwebgame/assets/101965138/ebcb6f2c-6d4b-48fb-8611-e09ec181f89e)

함수는 호출 스택에 하나씩 쌓이며, 호출스택에서 실행된다. 타이머나 이벤트리스너들은 백그라운드에 들어가고 태스크큐에는 타이머나 이벤트리스너들의 콜백함수들이 들어간다. 이벤트 루프는 호출스택이 비어있을 때 태스크 큐에 있는 작업을 호출스택으로 옮겨 실행한

`console.trace();` 를 통해 호출 스택에 쌓여있는 순서를 볼 수 있다.

스택과 같이 쌓일 때는 아래부터 쌓이며 실행은 위에서부터 실행된다.

<참고> https://www.jsv9000.app/ 사이트를 통해서 호출스택, 태스크큐, 마이크로 태스크큐, 이벤트 루프를 시각적으로 확인하는데 도움을 주는 사이트,

### 이벤트루프 분석을 통해 버그 수정

```jsx
function onClickCard() {
  if(!clickable || completed.includes(this) || clicked[0] === this){
    return
  }
  this.classList.toggle('flipped');
  clicked.push(this);
  if (clicked.length !== 2) {
    return
  }
  const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor
  const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor
  if (firstBackColor === secondBackColor) {
    completed.push(clicked[0])
    completed.push(clicked[1])
    clicked = []
    if (completed.length !== total) {
      return;
    }
    setTimeout(() => {
      alert('축하합니다');
      resetGame()
    }, 1000)
    return;

  }
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = []
  }, 1500)

}
```

코드를 확인해 보자. 2번 5번 8번 9번 카드를 연달아 4개를 클릭하면 두장의 카드가 다시 뒤집히지 않는 버그가 발생한다.

원인은 비동기 코드로 인해서 발생한다.

1. 2번 카드를 누르면 clicked 배열에 2가 들어아고 첫번째 if(clicked.length != 2) 조건문에서 return 된다
2. 5번 카드를 누르면  if(clicked.length != 2) 조건문에 걸리지 않고 카드를 뒤집는 setTimeout 코드가 실행된다. 이때 delay시간은 1500ms이다. 
3. 1500ms안에 8번 카드와 9번 카드가 클릭되면 clicked배열이 초기화 되기 전에 clicked배열에 들어가게 된다. 
4. clicked배열에서 flipped를 remove하는 코드는 인덱스가 0과 1로 지정되어있어 문제가 발생한다. 

일반적으로 이런 문제를 clickable변수를 통해 원치 않는 타이밍에 클릭이 되는 것을 방지하여  원치 않는 변수가 clicked배열에 들어가는 것을 방지한다.
