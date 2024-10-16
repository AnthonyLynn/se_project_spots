import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(selector, onSubmit) {
    super(selector);

    this._form = this._modal.querySelector(`.modal__form`);
    this._inputList = this._modal.querySelectorAll(`.modal__input`);
    this._onSubmit = onSubmit;
  }

  setInputValues(inputValues) {
    if (inputValues) {
      this._inputList.forEach((input) => {
        if (inputValues[input.id]) {
          input.value = inputValues[input.id];
        } else {
          input.reset();
        }
      });
    } else {
      this._form.reset();
    }
  }

  getForm() {
    return this._form;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._onSubmit(inputValues);
    });
  }
}
