export class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
  }

  _showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorEliment = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorEliment.textContent = errorMessage;
    errorEliment.classList.add(validationConfig.errorClass);
  }

  _hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement, validationConfig) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        validationConfig
      );
    } else {
      this._hideInputError(formElement, inputElement, validationConfig);
    }
  }

  _setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    this._toggleButtonState(
      inputList,
      buttonElement,
      validationConfig.inactiveButtonClass
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement, validationConfig);
        this._toggleButtonState(
          inputList,
          buttonElement,
          validationConfig.inactiveButtonClass
        );
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  enableValidation() {
    this._setEventListeners(this.formElement, this.validationConfig);
  }

  resetFormCondition() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.validationConfig.inputSelector)
    );
    const buttonElement = this.formElement.querySelector(
      this.validationConfig.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      this._hideInputError(this.formElement, inputElement, this.validationConfig);
    });
    this._toggleButtonState(
      inputList,
      buttonElement,
      this.validationConfig.inactiveButtonClass
    );
  }
}
