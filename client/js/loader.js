export default class Loader {
  static cssHref = '../css/loader.css';

  constructor() {
    this.loadCss();
    this.render();
    window.Loader = this;
  }

  loadCss() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = Loader.cssHref;
    new Promise(resolve => {
      link.addEventListener('load', () => resolve());
    });
    document.head.append(link);
  }

  show() {
    document.querySelector('div.loader').style.display = 'inline';
  }

  hide() {
    document.querySelector('div.loader').style.display = 'none';
  }

  render() {
    document.body.insertAdjacentHTML('beforeend', this.template());
  }

  template() {
    return `<div class="loader" style="display: none">
    <div class="inner one"></div>
    <div class="inner two"></div>
    <div class="inner three"></div>
  </div>`;
  }
}
