import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(selector, onDelete) {
    super(selector);

    this._deleteBtn = this._modal.querySelector(`#delete-btn`);
    this._cancelBtn = this._modal.querySelector(`#cancel-btn`);
    this.onDelete = onDelete;
  }

  setEventListeners() {
    super.setEventListeners();

    this._deleteBtn.addEventListener("click", () => {
      if (this.toDelete) this.onDelete(this.toDelete);
    });
    this._cancelBtn.addEventListener("click", this.close);
  }
}
