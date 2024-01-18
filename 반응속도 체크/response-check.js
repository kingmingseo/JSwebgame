const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
let records = [];
let timeoutId;
$screen.addEventListener('click', (event) => {
  if (event.target.classList.contains('waiting')) {
    $screen.classList.add('ready')
    $screen.classList.remove('waiting')
    $screen.textContent = '초록색이 되면 클릭하세요!'

    timeoutId = setTimeout(() => {
      startTime = new Date();
      $screen.classList.remove('ready')
      $screen.classList.add('now')
      $screen.textContent = '클릭하세요!'
    }, Math.floor(Math.random() * 1000 + 2000))
  }
  else if (event.target.classList.contains('ready')) {
    $screen.classList.add('waiting')
    $screen.classList.remove('ready')
    $screen.textContent = '너무 성급하셨군요!'
    clearTimeout(timeoutId)
  }
  else if (event.target.classList.contains('now')) {
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((a, c) => a + c) / records.length;
    $result.textContent = `현재: ${current}ms    평균: ${average}ms`;
    $screen.classList.remove('now')
    $screen.classList.add('waiting');
    $screen.textContent = '클릭해서 시작하세요'

    let sortRecords = records.sort((a, b) => a - b).slice(0, 5);
    sortRecords.forEach((a, i) => {
      let br = document.createElement('br')
      let temp = document.createTextNode(`${i+1}등:${sortRecords[i]}ms`)
      $result.appendChild(br);
      $result.appendChild(temp);
      
    })


  }



})

