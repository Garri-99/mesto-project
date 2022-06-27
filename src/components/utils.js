import { renderCard } from "./card";
import {
  profileName,
  profileActivity,
  nameInput,
  activityInput,
  titleCard,
  srcCard,
  cardPopup,
  profilePopup
} from "./constants";
import { closePopup } from "./modal";

export function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(profilePopup);
}

export function submitAddCardForm(evt) {
  evt.preventDefault();

  renderCard(titleCard.value, srcCard.value);
  closePopup(cardPopup);
}
