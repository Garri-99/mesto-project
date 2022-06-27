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
  cardsContainer,
  validationConfig
} from "./components/constants";
import { openPopup } from "./components/modal";
import { enableValidation, resetFormCondition } from "./components/validate";
import { createCard } from "./components/card";
import { submitEditProfileForm, submitAddCardForm } from "./components/utils";

export function renderCard(name, src) {
  cardsContainer.prepend(createCard(name, src));
}

enableValidation(validationConfig);


btnEditProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  resetFormCondition(validationConfig, profilePopup);
  openPopup(profilePopup);
});
btnAddCard.addEventListener("click", () => {
  formCard.reset();
  resetFormCondition(validationConfig, cardPopup);
  openPopup(cardPopup);
});

formProfile.addEventListener("submit", submitEditProfileForm);
formCard.addEventListener("submit", submitAddCardForm);

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});
