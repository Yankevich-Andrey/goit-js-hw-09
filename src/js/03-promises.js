const form = document.querySelector('.form');

// слухач
form.addEventListener('submit', e => {
  e.preventDefault();

  // змінні
  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  // можливо треба робити перевірку якщо введений "amount" більше нуля?
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
});

// function createPromise
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // коли Resolve
        resolve({ position, delay });
      } else {
        // коли Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
