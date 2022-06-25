function showInputError(formElement, inputElement, errorMessage) {
  const errorEliment = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__field_error');
  errorEliment.textContent = errorMessage;
  errorEliment.classList.add('form__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__field_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement)
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));
  const buttonElement = formElement.querySelector('.form__submit')
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input',  () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid
   })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive');
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove('form__submit_inactive')
    buttonElement.removeAttribute('disabled')
  }
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
