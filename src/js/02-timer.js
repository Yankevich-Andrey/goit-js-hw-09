// імпорт
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

// опції для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateSelect(selectedDates[0]);
  },
};

// змінні
const datetimePicker = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');
let selectedDate = null;
let intervalId = null;

// функція onDateSelect
function onDateSelect(date) {
  selectedDate = date;

  if (selectedDate < options.defaultDate) {
    Report.failure('Please choose a date in the future', 'ERROR', 'OK');
  } else {
    buttonStart.disabled = false;
  }
}

// функція addLeadingZero
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// функція updateTimer
function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

// функція convertMs
function convertMs(ms) {
  // Кількість мілісекунд в одиниці часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Решта днів
  const days = Math.floor(ms / day);
  // Решта годин
  const hours = Math.floor((ms % day) / hour);
  // Решта хвилин
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Решта секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// слухач події click на кнопці "Start"
buttonStart.addEventListener('click', () => {
  if (intervalId) {
    return;
  }

  buttonStart.disabled = true;
  datetimePicker.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;

    updateTimer(convertMs(deltaTime));

    if (deltaTime < 1000) {
      clearInterval(intervalId);
      datetimePicker.disabled = false;
      intervalId = null;
    }
  }, 1000);
});
