import Loader from './loader.js';
import Toast from './toast.js';
import API from "./api.js";

export default class App {
  constructor(domElement) {
    new Loader();
    App.events();
    API.query('/api/products');
  }

  static events = () => {
    window.addEventListener('offline', () => {
      new Toast('Потеряно соединение с интернетом', {
        type: 'warning',
      });
    });

    window.addEventListener('online', () => {
      new Toast('Соединение с интернетом восстановлено');
    });
  }
}
