// блок імпорту
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

// додаткові опції
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateSelect(selectedDates[0]);
  },
};

// ініціалізація бібліотекі flatpickr
const fp = flatpickr('#datetime-picker', options);

// змінні
let selectedDate = null;
let intervalId = null;

// доступ до кнопки "Start"
const buttonStart = document.querySelector('button[data-start]');
buttonStart.disabled = true;

// function onDateSelect
function onDateSelect(date) {
  selectedDate = date;

  if (selectedDate < options.defaultDate) {
    Report.failure('Please choose a date in the future', 'ERROR', 'OK');
  } else {
    buttonStart.disabled = false;
  }
}

// function addLeadingZero
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// function updateTimer
//function updateTimer
function updateTimer({ days, hours, minutes, seconds }) {
  const timerDays = document.querySelector('span[data-days]');
  const timerHours = document.querySelector('span[data-hours]');
  const timerMinutes = document.querySelector('span[data-minutes]');
  const timerSeconds = document.querySelector('span[data-seconds]');

  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

// convertMs
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// слухач якщо нажали кнопку "Start"
buttonStart.addEventListener('click', () => {
  if (intervalId) {
    return;
  }

  buttonStart.disabled = true;
  fp.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;

    updateTimer(convertMs(deltaTime));

    if (deltaTime < 1000) {
      clearInterval(intervalId);

      fp.disabled = false;
    }
  }, 1000);
});