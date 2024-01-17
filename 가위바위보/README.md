# [웹게임]가위바위보

작성일시: 2024년 1월 17일 오후 5:51
복습: No

```jsx
//이미지 스프라이트를 사용하기 위한 이미지 불러오기

const imgUrl = './rsp.png'

$computer.style.background = `url(${imgUrl}) 0 0`; //'가로위치 세로위치'
즉 첫번째 좌표는 왼쪽으로부터 오른쪽으로 이미지를 얼마만큼 이동시킬지
두번째 좌표는 위에서부터 아래로 얼마나 이동시킬지

$computer.style.backgroundSize = 'auto 200px' //'가로너비 세로너비'
```

이미지를 setInterval()함수를 통해 전환

setTimeout() 함수와 유사하게

setInterval(콜백함수, 시간) 형식으로 작성하며 매 시간마다 콜백함수를 실행시킨다.

```jsx
let coord = '0';
setInterval(() => {
  if (coord === rspX.scissors) {
    coord = rspX.rock
    $computer.style.background = `url(${imgUrl}) ${rspX.rock} 0`;
    $computer.style.backgroundSize = 'auto 200px'
  }
  else if(coord === rspX.rock){
    coord = rspX.paper
    $computer.style.background = `url(${imgUrl}) ${rspX.paper} 0`;
    $computer.style.backgroundSize = 'auto 200px'
  }

  else if(coord === rspX.paper){
    coord = rspX.scissors
    $computer.style.background = `url(${imgUrl}) ${rspX.scissors} 0`;
    $computer.style.backgroundSize = 'auto 200px'
  }

}, 50)
```

**타이머 멈췄다가 다시 실행 시키기**

자바스크립트는 setInterval함수를 취소할 수 있는 방법으로 clearInterval함수를 제공

```jsx
let 아이디 = setInterval(함수,밀리초); //setInterval 함수의 반환 값으로 id가 주어진다.
clearInterval(아이디);
```

**버튼을 여러 번 누르면 이미지 전환이 더 빠르게 일어나는 버그 발생**

```jsx
const clickButton = () =>{
  clearInterval(intervalId);

  setTimeout(()=>{
    intervalId = setInterval(changeComputerHand, 50)
  },1000);
}

$rock.addEventListener('click',clickButton)
$paper.addEventListener('click',clickButton)
$scissors.addEventListener('click',clickButton)
```

원인은 1초안에 5번 버튼을 연달아 누른다고 가정 했을 때 

clearInterval()함수는 즉각적으로 실행이 제때 제때 일어난다. 
하지만 setTimeout안에 있는 함수는 1초라는 지연 시간으로 인해 intervalId가 제 시간에 업데이트 되지 않는다. 결국 clearInterval()은 최초의 inrervalId만 5번 클리어 하게 되고 지연시간으로 인해 새롭게 intervalId가 지정되는 컨텍스트 들이 늘어나는 것이다. 

해결 하기 위해서는 setTimeout이 실행되기 전에도 clearInterval() 함수를 통해서 새로운 컨텍스트가 증가하기 전에 한번씩 interval을 제거해주면 된다. 

```jsx
const clickButton = () =>{ 
  clearInterval(intervalId);

  setTimeout(()=>{
    clearInterval(intervalId);
    intervalId = setInterval(changeComputerHand, 50)
  },1000);
}

$rock.addEventListener('click',clickButton)
$paper.addEventListener('click',clickButton)
$scissors.addEventListener('click',clickButton)
```

### 또 다른 방법 - 애초에 버튼이 안 눌리게 이벤트 리스너를 제거

```jsx
let intervalId = setInterval(changeComputerHand, 50)

const clickButton = () => {
  clearInterval(intervalId);

  $rock.removeEventListener('click', clickButton)
  $paper.removeEventListener('click', clickButton)
  $scissors.removeEventListener('click', clickButton)
  setTimeout(() => {
    intervalId = setInterval(changeComputerHand, 50)
    $rock.addEventListener('click', clickButton)
    $paper.addEventListener('click', clickButton)
    $scissors.addEventListener('click', clickButton)
  }, 1000);
}
```

### 또 다른 방법2 - 플래그 변수 활용

```jsx
let intervalId = setInterval(changeComputerHand, 50)
let clickable = true
const clickButton = () => {
  if(clickable === true){
    clickable = false;
    clearInterval(intervalId);
    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeComputerHand, 50)
      
    }, 1000);
  }

}
```

clickable변수가 true일때만 코드가 실행 되도록 한다. 

우선 클릭이 되면 버튼을 false로 바꾸고 setTimeout함수에서 버튼을 true로 변환해주면 setTimeout함수의 콜백함수가 실행되기 전까지는 clickButton내부의 코드가 실행되지 않기 때문에 interval컨텍스트가 쌓이는 것을 방지 할 수 있다. 

참고하기

```jsx
const fun = (값) => () =>{
	console.log('고차함수입니다',값);
}

태그.addEventListener('click',fun(1));
태그.removeEventListener('click',fun(1));
**//이벤트리스너가 제거되지않는다. 
//함수는 객체이므로 서로 다른 메모리 주소를 갖기 때문에 같은 이벤트리스너라고 인식되지 않기 때문.
고로 이벤트리스너를 만들때 부터 고차함수라면 고차함수를 변수에 넣어서 이벤트리스너를 add해줘야 한다.** 
```