function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorEliment = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorEliment.textContent = errorMessage;
  errorEliment.classList.add(validationConfig.errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(
  formElement,
  inputElement,
  validationConfig
) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(
  formElement,
  validationConfig
) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        validationConfig
      );
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      validationConfig
    );
  });
}

export function resetFormCondition(validationConfig, popup) {
  const inputList = Array.from(
    popup.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = popup.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(
      popup,
      inputElement,
      validationConfig
    );
  });
  toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );
}
