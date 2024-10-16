export default class Modal {
  constructor(selector) {
    this._modal = document.querySelector(selector);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOutsideClickClose = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.close();
    }
  };

  setEventListeners() {
    this._modal.addEventListener("mousedown", this._handleOutsideClickClose);

    this._closeBtn = this._modal.querySelector(".modal__exit-btn");
    this._closeBtn.addEventListener("click", this.close);
  }

  open = () => {
    document.addEventListener("keydown", this._handleEscapeClose);
    this._modal.classList.add("modal_opened");
  };

  close = () => {
    document.removeEventListener("keydown", this._handleEscapeClose);
    this._modal.classList.remove("modal_opened");
  };
}
