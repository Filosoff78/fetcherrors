export default class Toast {
  constructor(message, options = {}) {
    this._message = message;
    this._options = options;
    this._id = Date.now();

    this.setOptions();
    this.addToast();
  }

  template() {
    return `
    <div class="toast-container position-fixed bottom-0 end-0 p-3" data-toastId="${this._id}">
      <div id="liveToast" class="toast fade show ${this._options.type}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">${this._options.title}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${this._message}
        </div>
      </div>
    </div>
    `;
  }

  setOptions() {
    this._options.type = this._options.type || 'success';
    this._options.lifeTime = this._options.lifeTime || 3000;
    switch (this._options.type) {
      case 'error': this._options.title = 'Ошибка'; break;
      case 'warning': this._options.title = 'Предупреждение'; break;
      default: this._options.title = 'Успешно';
    }
  }

  addToast() {
    document.getElementById('toast').insertAdjacentHTML('beforeend', this.template());
    setTimeout(() => {
      const toast = document.querySelector(`.toast-container[data-toastId="${this._id}"]`);
      if (toast) toast.remove();
    }, this._options.lifeTime);
  }
}
