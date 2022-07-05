function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorEliment = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorEliment.textContent = errorMessage;
  errorEliment.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function setEventListeners(
  formElement,
  inputSelectort,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelectort));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
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
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
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
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
  toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );
}
