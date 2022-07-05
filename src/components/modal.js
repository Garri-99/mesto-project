import { body, popups } from "./constants";
import { patchEditAvatar, patchEditProfile, postAddCard } from "./api";
import { renderCard } from "./card";
import {
  profileName,
  profileActivity,
  nameInput,
  activityInput,
  titleCard,
  srcCard,
  cardPopup,
  profilePopup,
  avatarInput,
  avatarPopup,
  profileAvatar,
  btnCardSubmit,
  btnProfileSubmit,
  btnAvatarSubmit,
} from "./constants";
import { renderLoading } from "./utils";

function handleEsc(evt) {
  if (evt.key === "Escape") {
    evt.preventDefault();
    popups.forEach(closePopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  body.addEventListener("keydown", handleEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  body.removeEventListener("keydown", handleEsc);
}

export function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  renderLoading(true, btnProfileSubmit);
  patchEditProfile(nameInput.value, activityInput.value)
    .then(() => closePopup(profilePopup))
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, btnProfileSubmit));
}

export function submitAddCardForm(evt) {
  evt.preventDefault();

  renderLoading(true, btnCardSubmit);
  postAddCard(titleCard.value, srcCard.value)
    .then((res) => {
      renderCard(res.name, res.link, res.likes.length, res._id, res.owner._id);
      closePopup(cardPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, btnCardSubmit, "Создать"));
}

export function submitEditAvatar(evt) {
  evt.preventDefault();

  renderLoading(true, btnAvatarSubmit);
  profileAvatar.src = avatarInput.value;
  patchEditAvatar(avatarInput.value)
    .then(() => closePopup(avatarPopup))
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, btnAvatarSubmit));
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});
