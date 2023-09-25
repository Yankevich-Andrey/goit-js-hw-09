// Змінні
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let idInterval = null; // мйбутній id поки що null
const timeInterval = 1000; // час інтервалу виніс у змінну

stopBtn.disabled = true; // при першому завантаженні сторінки

// слухаєм якщо натиснули START
startBtn.addEventListener('click', () => {
  // отключаем кнопку START
  startBtn.disabled = true;

  // включаем кнопку STOP
  stopBtn.disabled = false;

  // меняем цвет
  idInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, timeInterval);
});

// слухаєм якщо натиснули STOP
stopBtn.addEventListener('click', () => {
  // включаем кнопку START
  startBtn.disabled = false;

  // отключаем кнопку STOP
  stopBtn.disabled = true;

  // видаляєм setInterval по його id (intervalId)
  clearInterval(idInterval);
});

//генератор кольору в форматі Hex
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
