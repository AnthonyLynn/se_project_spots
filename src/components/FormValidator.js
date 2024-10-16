export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
  }

  _showInputError(input) {
    const errorElementId = `#${input.id}-error`;
    const errorElement = this._form.querySelector(errorElementId);
    input.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(input) {
    const errorElementId = `#${input.id}-error`;
    const errorElement = this._form.querySelector(errorElementId);
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButton(isDisabled = true) {
    if (isDisabled) {
      this._button.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._button.classList.remove(this._settings.inactiveButtonClass);
    }

    this._button.disabled = isDisabled;
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._button = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButton();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton(this._hasInvalidInput());
      });
    });
  }

  _resetInputs() {
    this._form.reset();
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButton();
    this._resetInputs();
  }
}
