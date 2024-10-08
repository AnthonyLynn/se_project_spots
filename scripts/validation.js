//-- Varaibles --//
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//-- Functions --//
function showInputError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);

  input.classList.add(config.inputErrorClass);
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);

  input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(form, input, config) {
  if (input.validity.valid) {
    hideInputError(form, input, config);
  } else {
    showInputError(form, input, input.validationMessage, config);
  }
}

function toggleButtonState(inputs, button) {
  const notValid = inputs.some((input) => {
    return !input.validity.valid;
  });

  if (notValid) {
    disableButton(button);
  } else {
    enableButton(button);
  }
}

function enableButton(button) {
  button.disabled = false;
}

function disableButton(button) {
  button.disabled = true;
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, button);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button);
    });
  });
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

enableValidation(settings);
