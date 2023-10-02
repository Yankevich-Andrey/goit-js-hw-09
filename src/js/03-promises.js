import Notiflix from 'notiflix';

const amountEl = document.querySelector(`input[name="amount"]`);
const delayEl = document.querySelector(`input[name="delay"]`);
const stepEl = document.querySelector('input[name="step"]');
const btn = document.querySelector(`button`);

btn.addEventListener(`click`, onClickButton);

function onClickButton(evt) {
  evt.preventDefault();
  let step = Number(stepEl.value);
  let delay = Number(delayEl.value);
  let amount = Number(amountEl.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ i, delay }) =>
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`)
      )
      .catch(({ i, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`)
      );
    delay += step;
  }
}

function createPromise(i, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ i, delay });
      }
      reject({ i, delay });
    }, delay);
  });
}
