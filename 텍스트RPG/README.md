# [웹게임] 텍스트RPG

작성일시: 2024년 1월 18일 오후 5:01
복습: No

form 태그 안의 요소에서 ‘submit’ 이벤트가 발생하면 event.targeT이 form태그와 그 내부요소들이 된다. 

```jsx
event.target['name-input'].value // 이런식으로 id를 가진 태그의 value를 가져올 수 있다.
```

### 깊은 복사와 얕은 복사

깊은복사 : 깊은복사는 모든 참조관계가 끊기고 완벽하게 복사된다.

얕은복사 : 얕은복사는 제일 겉 껍데기 참조관계만 끊긴다.

```jsx
const a = [];
const b = "hi";
const c = {};

const arr0 = [a,b,c];
const arr1 = arr0;
const arr2 = [...arr0]
const arr3 = JSON.parse(JSON.stringify(arr0)

arr1[1] = "hello";
arr1[0].push(1);
console.log(arr0[1]) // 참조관계 이므로 "hello"가 출력된다
console.log(arr0[0]) // 참조관계 이므로 [1]이 출력된다.

arr2[1] = "hello";
arr2[0].push(1);
console.log(arr0[1]) // 얕은 복사를 해서 가장 겉 참조관계가 끊겨 기존 arr0[1] 값인 "hi" 가 출력된다
console.log(arr0[0]) // 가장 겉 껍데기 배열만 벗겨지고 내부에 있는 요소가 원시값이 아니면 그대로 참조된 값이기 때문에 [1]이 출력된다

//깊은복사를 하면 모든 참조관계가 끊겨 arr3에 추가하면 arr0은 영향을 미치지 않고 독립적으로 arr3에 요소가 추가된다
```

### 객체리터럴에서의 function 생략

```jsx
const hero = {
  name: '',
  lev: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
  attack(monster){
    monster.hp-=this.att;
    this.hp-=monster.att;
  },
  heal(monster){
    this.hp +=20;
    this.hp -=monster.att;
  }
};
```

객체 안에 있는 함수를 메소드라고 한다.
메소드를 만들때는 `attack: function(){}` 을 `attack(){}` 으로 생략가능하다

### 자바스크립트의 this

브라우저에서 말하는 this는 일반적으로 window객체를 의미한다.

그렇다면 this가 windows가 아닌 경우는 언제인가?

```jsx
var obj = {
  a: function() { console.log(this); },
};
obj.a(); // obj
```

위 코드에서 this는 객체 obj를 가리킨다. 이것은 개체의 메소드를 호출할 때 this를 내부적으로 바꿔주기 때문이다. 

```jsx
var a2 = obj.a;
a2(); // window
```

obj.a를 a2에 할당하고 a2를 실행하면 다시 this가 windows가 된다. 
호출할 때, 호출하는 함수가 객체의 메서드인지 아니면 그냥 함수인지가 중요하다.
a2는 obj.a를 꺼내온 것 이기 때문에 더 이상 obj의 메서드가 아니다. 

bind, call, apply를 이용해 b가 가리키는 this를 명시적으로 정해줄 수 있다. 

(화살표 함수는 bind로 this를 바꿀 수 없다)

```jsx
var obj2 = { c: 'd' };
function b() {
  console.log(this);
}
b(); // Window
b.bind(obj2).call(); // obj2
b.call(obj2); // obj2 
b.apply(obj2); // obj2
```

### 화살표 함수와 this

```jsx
$gameMenu.addEventListener('submit', function(){
console.log(this});
//addEventListener의 this는 리스너가 붙은 대상 즉 $gameMenu이다.
하지만

$gameMenu.addEventListener('submit', ()=>{
console.log(this});
//화살표 함수내부에서의 this는 한단계 바깥쪽의 this를 그대로 가져온다

즉 this는 함수가 호출 될 때 결정되는 것이다. 

```

특정 메서드는 콜백 함수의 this를 바꾼다는 것을 명심하

### 클래스

```jsx
class Monster{
 constructor(name, hp, att,xp){
	this.name = name;
	this.hp = hp;
	this.att = att;
	this.xp = xp;
 }
}

const monster1 = new Monster('슬라임,25,10,11);
```

과거 자바스크립트는 객체 내부에 함수를 만들어 팩토리 패턴으로 객체를 찍어 내어
사용은 지금과 같이 new를 통해서 하곤했다. 하지만 new를 안썼을 때도 컴파일 오류는 없이 작동은 되지만 this가 가리키는 객체가 window가 되기 때문에 문제가 발생했다. 클래스 문법은 new를 적지 않았을 때의 문제를 코드작성 과정에서 확인 할 수 있게 해줘 훨씬 더 편리하며 메소드를 추가할 때도 클래스 내부에 작성해서 코드의 응집도가 높아졌다.

(기존에는 프로토타입을 사용하며 코드가 중구난방일 수 있었)

### 상속

클래스 간의 공통점을 발견했을 때  상속을 통해서 중복을 제거할 수 있다.

```jsx
class Unit {
  constructor(game, name, hp, att, xp) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(target) {
    target.hp -= this.att;
  }
}
class Hero extends Unit {
  constructor(game, name) {
    super(game, name, 100, 10, 0)
    this.lev = 1;
  }
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }
  getXp(xp) {
    this.xp += xp;
    if (this.xp >= this.lev * 15) {
      this.xp -= this.lev * 15;
      this.lev += 1;
      this.maxHp += 10;
      this.att += 10;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨 업! 현재 레벨 ${this.lev}`)
    }
  }
}
class Monster extends Unit {
  constructor(game, name) {
    super(game, name, hp, att, xp)
  }
}
```

몬스터와 히어로에 공통적으로 필요한 변수들이 존재했다.

이를 가장 부모클래스인 Unit을 만들어 히어로와 몬스터가 상속받게 해서 중복을 제거했다. 

super를 사용하면 부모클래스의 constructor를 그대로 사용할 수 있다. 

### 메소드 오버라이딩

위의 Unit 클래스의 attack메소드에 코드를 살짝 추가해서 사용하고 싶은 경우에는 

```jsx
class Monster extends Unit {
  constructor(game, name) {
    super(game, name, hp, att, xp)
  }
	attack(){
		super.attack()
		console.log('추가코드')
	}
}
```

위와 같이 부모 클래스의 attack메소드를 자식 클래스의 attack 메소드 안에 super를 통해서 호출할 수 있다.