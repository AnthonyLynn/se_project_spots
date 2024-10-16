import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(selector) {
    super(selector);

    this._image = this._modal.querySelector(`.modal__image`);
    this._caption = this._modal.querySelectorAll(`.modal__caption`);
  }

  loadImage(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
  }
}
