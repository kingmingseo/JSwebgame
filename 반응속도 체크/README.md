# [웹게임]반응속도 체크

작성일시: 2024년 1월 18일 오전 10:09
복습: No

일반적으로 화면을 전환하기 위해서는 클래스를 변경하는 방법을 활용한다.

```css
#screen.waiting{
  background-color: aqua;
}

#screen.ready{
  background-color: red;
  color: white;
}

#screen.now{
  background-color: greenyellow;
}

//이런식으로 특정 클래스에서의 화면을 css를 통해 정해주고 
//js를 통해 클래스를 변경해주면서 화면 전환을 한다.
//또는 특정 클래스가 담겨있는지 확인해주면서 화면 전환을 할 수있다. 
```

```jsx
//js를 통해 클래스를 변경해주면서 화면 전환을 한다.
태그.clsssList.add('클래스명');
태그.clsssList.remove('클래스명'); //제거
태그,classList.replace('기존클래스','대체클래스') //수정
태그.setAttribute('class', 'newClass'); //setAttribute를 통해서도 가능

//또는 특정 클래스가 담겨있는지 확인해주면서 화면 전환을 할 수있다.
태그.classList.constains('클래스명') // 해당 클래스를 태그가 가지고 있으면 true 없으면 false를 반환한다.

```

**시간을 측정하기 위해 new Date() 객체 사용하기**

```jsx
let startTime;
let endTime;
$screen.addEventListener('click',(event)=>{
  if(event.target.classList.contains('waiting')){
    $screen.classList.add('ready')
    $screen.classList.remove('waiting')
    $screen.textContent = '초록색이 되면 클릭하세요!'

    setTimeout(()=>{
      **startTime =new Date();   *************************
      $screen.classList.remove('ready')
      $screen.classList.add('now')
      $screen.textContent = '클릭하세요!'
    },Math.floor(Math.random()*1000+2000))
  }
  else if(event.target.classList.contains('ready')){
    $screen.classList.add('waiting')
    $screen.classList.remove('ready')
    $screen.textContent = '너무 성급하셨군요!'
  }
  else if(event.target.classList.contains('now')){
    **endTime = new Date(); *************************
    **$result.textContent = `${endTime-startTime}ms`; *************************
    $screen.classList.remove('now')
    $screen.classList.add('waiting');
    $screen.textContent='클릭해서 시작하세요'
  }
})
```

클릭을 유도하는 화면이 나오자마자 그 시점의 시간을 new Date 객체를 통해 startTime 변수에 저장한다. 그리고 클릭을 한 시점의 시간 또한 new Date 객체를 통해 endTime 변수에 저장한다. 시간이 지날수록 new Date()객체를 통해 가져오는 시간의 크기가 커지므로 그 시간 차는 endTime - startTime을 통해 구할 수 있다. 

```jsx
new Date(2021,2,3) - new Date(2022,2,3) //을 하면 두 날짜 사이의 시간 차를 ms 단위로 알 수 있다 
```

**reduce()함수를 통해서 평균 구하기** - **누적함수**

```jsx
[1,2,3,4].reduce((a,c)=>(a+c),0)
// a:0 c:1
// a:1 c:2
// a:3 c:3
// a:6 c:10
// 10
```

**reduce()함수 응용하기** 

```jsx
['철수', '영희', '현영', '민서'].reduce((a,c,i)=>{a[i] = c; return a},{})
// a:{} c:'철수' i:0
// a:{0: '철수'} c:'영희' i:1
// a:{0: '철수', 1:'영희'} c:'현영' i:2
// a:{0: '철수', 1:'영희', 2:'현영' } c:'민서' i:3
// a:{0: '철수', 1:'영희', 2:'현영', 3:'민서' }
```

참고 : reduce는 초기값을 넣지 않으면 배열의 첫번 째 값이 초기 값이다.