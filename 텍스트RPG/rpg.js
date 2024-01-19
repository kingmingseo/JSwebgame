const $startScreen = document.querySelector('#start-screen')
const $gameMenu = document.querySelector('#game-menu')
const $battleMenu = document.querySelector('#battle-menu')
const $heroName = document.querySelector('#hero-name')
const $heroLevel = document.querySelector('#hero-level')
const $heroHp = document.querySelector('#hero-hp')
const $heroXp = document.querySelector('#hero-xp')
const $heroAtt = document.querySelector('#hero-att')
const $monsterName = document.querySelector('#monster-name')
const $monsterHp = document.querySelector('#monster-hp')
const $monsterAtt = document.querySelector('#monster-att')
const $message = document.querySelector('#message')
const $monsterStat = document.querySelectorAll('#monster-stat span')

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, xp: 10 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
      { name: '마왕', hp: 100, att: 30, xp: 50 },
    ];
    this.start(name);
  }
  start(name) {
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game')
    this.hero = new Hero(this, name);
    this.updateHeroStat()
  }
  quit() {
    game = null;
    this.hero = null;
    this.monster = null;
    this.updateHeroStat()
    this.updateMonsterStat()

    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start')

  }
  updateHeroStat() {
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = ''
      $heroLevel.textContent = ''
      $heroHp.textContent = ''
      $heroXp.textContent = ''
      $heroAtt.textContent = ''
      return;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `Lev: ${hero.lev}`
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`
  }
  updateMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = ''
      $monsterHp.textContent = ''
      $heroAtt.textContent = ''
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`
  }
  showMessage(text) {
    $message.textContent = text;
  }

  changeScreen(screen) {
    if (screen === 'start') {
      $startScreen.style.display = 'block'
      $gameMenu.style.display = 'none'
      $battleMenu.style.display = 'none'
    }
    else if (screen === 'game') {
      $startScreen.style.display = 'none'
      $gameMenu.style.display = 'block'
      $battleMenu.style.display = 'none'
    }
    else if (screen === 'battle') {
      $startScreen.style.display = 'none'
      $gameMenu.style.display = 'none'
      $battleMenu.style.display = 'block'
    }
  }
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;
    if (input === '1') { //모험
      this.changeScreen('battle')
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp
      )
      this.updateMonsterStat();
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}이다!`)
    }
    else if (input === '2') { //휴식
      this.hero.hp = this.hero.maxHp
      this.updateHeroStat();
      this.showMessage(`충분한 휴식을 취했다`)
    }
    else if (input === '3') { //종료
      this.showMessage('게임을 종료합니다')
      this.quit()

    }
  }

  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    if (input === '1') { //공격
      const { hero, monster } = this
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) {
        this.showMessage(`${hero.lev} 레벨에서 전사. 새 주인공을 생성하세요`);
        $monsterStat.forEach((e) => {
          e.textContent = '';
        })
        this.quit()
      }
      else if (monster.hp <= 0) {
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 획득!`)
        hero.getXp(monster.xp)
        this.changeScreen('game')
        this.monster = null;
        $monsterStat.forEach((e) => {
          e.textContent = '';
        })
      }
      else {
        this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`)
      }
      this.updateHeroStat()
      this.updateMonsterStat()
    }
    else if (input === '2') { //회복
      const {hero, monster} =this;
      hero.heal(monster);
      monster.attack(hero);
      this.showMessage('체력을 조금 회복했다!')
      this.updateHeroStat();
    }
    else if (input === '3') { //도망
      this.changeScreen('game')
      this.showMessage('부리나케 도망쳤다!')
      this.monster = null;
      this.updateMonsterStat();

    }
  }
}

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
    if (this.hp > this.maxHp){
      this.hp = this.maxHp;
    }

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
  constructor(game, name, hp, att, xp) {
    super(game, name, hp, att, xp)
  }
}
let game = null;
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['name-input'].value;
  game = new Game(name);
})

