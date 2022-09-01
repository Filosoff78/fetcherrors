import Toast from './toast.js';
import Render from './render.js';

const Newapi = {
  answer: null,
  src: null,

  attempt: 0,

  query: (src) => {
    Newapi.src = src;
    window.Loader.show();
    new Promise((resolve, reject) => Newapi.getFetch(resolve, reject))
      .then(() => new Promise((resolve, reject) => Newapi.getJson(resolve, reject)))
      .catch((error) => Newapi.catchError(error));
  },

  getFetch(resolve, reject) {
    return fetch(this.src).then((response) => {
      this.answer = response;
      if (!response.ok) reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
      else resolve();
    }).catch(() => {
      reject('Произошла ошибка, проверьте подключение к интернету');
    });
  },

  getJson(resolve, reject) {
    this.answer.json()
      .then((response) => {
        window.Loader.hide();
        Render.render(response);
        resolve();
      })
      .catch(() => reject('Произошла ошибка, попробуйте обновить страницу позже'));
  },

  catchError(error) {
    console.log('catchError', error);
    window.Loader.hide();
    let toastText;
    if (this.answer) {
      switch (this.answer.status) {
        case 500: {
          this.attempt++;
          toastText = `Ошибка 500: попытка получить ответ ${this.attempt}/3`;
          if (this.attempt < 3) this.query(this.src);
          else toastText = 'Произошла ошибка, попробуйте обновить страницу позже';
          break;
        }
        case 404: {
          Render.render({});
          break;
        }
        default: toastText = error;
      }
    } else toastText = error;
    if (toastText) new Toast(toastText, { type: 'error' });
  },
};

export default Newapi;
