# [웹게임] 끝말잇기

작성일시: 2024년 1월 16일 오전 9:57
복습: No

HTML에서 자바스크립트 외부 파일을 불러오기 위한 방법은 여러가지가 있다.

그 중 head태그에서 자바스크립트를 불러오는 방법을 선택했다.

자바스크립트를 통해서 DOM을 조작하고 싶다면 DOM콘텐츠가 모두 load되고 나서 querySelctor를 통해 DOM콘텐츠를 선택 해야 한다. head태그는 일반적으로 dom 컨텐츠가 load되기 이전에 실행 되기 때문에 `defer` 를 사용하면 된다 .

`<script type="text/javascript" src="word-relay.js" defer></script>`

이외의 방법으로는 "DOMContentLoaded" 이벤트리스너 활용 

```jsx
document.addEventListener("DOMContentLoaded", ()=> {
	console.log("원하는 코드 적기")
});
```

그리고 단순히 HTML body 태그 아래에 <script>태그를 작성하는 방법이 있다

---

prompt는 사용자로부터 입력을 받는 창을 띄운다 (문자열 형식으로 받는다)

```jsx
const number = Number(prompt('몇 명이 참가하나요?'));
//끝말잇기를 하기위해 최초로 몇 명이 참가할지 입력을 받는 부분
//prompt창에서 취소를 누르면 기본적으로 null값이고 Number로 변환하면 NaN이 된다.
```

alert는 사용자에게 경고창을 띄운다

```jsx
alert(number) // 입력받은 참가인원 수를 띄울 수 있다.
```

confirm은 사용자에게 **[확인]** 또는 **[취소]** 를 입력받아 **true, false** 값으로 반환한다

```jsx
const temp = confirm('확인? 취소?')
alert(temp) // 확인을 누르면 true 취소를 누르면 false
```

document.querySelector 선택자 사용 예시

```jsx
document.querySelector('body #target button')
//body 태그 안에 id가 target인 태그 안의 button을 선택
```

커서 위치를 두는 법은 querySelector로 선택한 태그에 focus 명령어를 추가한다

```jsx
$input.focus();
```
