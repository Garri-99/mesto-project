import "./pages/index.css";
import {
  initialCards,
  profilePopup,
  cardPopup,
  btnAddCard,
  btnEditProfile,
  formCard,
  formProfile,
  profileName,
  profileActivity,
  nameInput,
  activityInput,
} from "./components/constants";
import { openPopup } from "./components/modal";
import { enableValidation, toggleButtonState, hideInputError } from "./components/validate";
import { renderCard } from "./components/card";
import { submitEditProfileForm, submitAddCardForm } from "./components/utils";

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__field_error',
  errorClass: 'form__input-error_active'
});


btnEditProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  const inputList = Array.from(profilePopup.querySelectorAll('.form__field'));
  const buttonElement = profilePopup.querySelector('.form__submit');
  inputList.forEach((inputElement) => {
    hideInputError(profilePopup, inputElement, 'form__field_error', 'form__input-error_active')
  });
  toggleButtonState(inputList, buttonElement, 'form__submit_inactive');
  openPopup(profilePopup);
});
btnAddCard.addEventListener("click", () => {
  formCard.reset();
  const inputList = Array.from(cardPopup.querySelectorAll('.form__field'));
  const buttonElement = cardPopup.querySelector('.form__submit');
  inputList.forEach((inputElement) => {
    hideInputError(cardPopup, inputElement, 'form__field_error', 'form__input-error_active')
  });
  toggleButtonState(inputList, buttonElement, 'form__submit_inactive');
  openPopup(cardPopup);
});

formProfile.addEventListener("submit", submitEditProfileForm);
formCard.addEventListener("submit", submitAddCardForm);

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});
