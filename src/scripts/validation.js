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

export function hideFormInputErrors(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));

  inputs.forEach((input) => {
    hideInputError(form, input, config);
  });
}

function toggleButtonState(inputs, button) {
  if (inputs.length === 0) return;

  const notValid = inputs.some((input) => {
    return !input.validity.valid;
  });

  if (notValid) {
    disableButton(button);
  } else {
    enableButton(button);
  }
}

export function enableButton(button) {
  button.disabled = false;
}

export function disableButton(button) {
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

  form.addEventListener("reset", () => {
    hideFormInputErrors(form, config);
    disableButton(button);
  });
}

export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}
