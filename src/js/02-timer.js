// Імпорти
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

// Опції для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateSelect(selectedDates[0]);
  },
};

// Елементи
const datetimePicker = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

// Змінні
let selectedDate = null;
let intervalId = null;

// Ініціалізація flatpickr
flatpickr(datetimePicker, options);

datetimePicker.addEventListener('change', () => {
  onDateSelect(datetimePicker.selectedDates[0]);
});

// Функції
function onDateSelect(date) {
  selectedDate = date;

  if (date < options.defaultDate) {
    Report.failure('Оберіть дату в майбутньому', 'Помилка', 'OK');
  } else {
    buttonStart.disabled = false;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Обробники
buttonStart.addEventListener('click', () => {
  if (intervalId) {
    return;
  }

  buttonStart.disabled = true; // блокуємо
  datetimePicker.disabled = true; // блокуємо

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;

    updateTimer(convertMs(deltaTime));

    if (deltaTime < 1000) {
      clearInterval(intervalId);
      datetimePicker.disabled = false; // разблокуємо для ввода нової дати та часу
      intervalId = null; // обнуляємо
    }
  }, 1000);
});
