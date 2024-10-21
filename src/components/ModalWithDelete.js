import Modal from "./Modal.js";

export default class ModalWithDelete extends Modal {
  constructor(selector, onDelete) {
    super(selector);

    this._deleteBtn = this._modal.querySelector(`#delete-btn`);
    this._deleteText = this._deleteBtn.textContent;
    this._cancelBtn = this._modal.querySelector(`#cancel-btn`);
    this._onDelete = onDelete;
  }

  setIsDeleting(isDeleting) {
    if (isDeleting) {
      this._deleteBtn.textContent = "Deleting...";
    } else {
      this._deleteBtn.textContent = this._deleteText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._deleteBtn.addEventListener("click", () => {
      if (this.toDelete) this._onDelete(this.toDelete);
    });
    this._cancelBtn.addEventListener("click", this.close);
  }
}
