import { body, btnConfirmSubmit, confirmationPopup, popups } from "./constants";
import {
  patchEditAvatar,
  patchEditProfile,
  postAddCard,
  deleteCard,
} from "./api";
import { renderCard, card } from "./card";
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

  renderLoading(true, btnProfileSubmit);
  patchEditProfile(nameInput.value, activityInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileActivity.textContent = activityInput.value;
      closePopup(profilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() =>
      setTimeout(() => renderLoading(false, btnProfileSubmit), 1000)
    );
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
    .finally(() =>
      setTimeout(() => renderLoading(false, btnCardSubmit, 'Создать'), 1000)
    );
}

export function submitEditAvatar(evt) {
  evt.preventDefault();

  renderLoading(true, btnAvatarSubmit);
  patchEditAvatar(avatarInput.value)
    .then(() => {
      profileAvatar.src = avatarInput.value;
      closePopup(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() =>
      setTimeout(() => renderLoading(false, btnAvatarSubmit), 1000)
    );
}

export function submitConfirmDelete() {
  renderLoading(true, btnConfirmSubmit, null, 'Удаление...');
  deleteCard(card.id)
    .then(() => {
      card.remove();
      closePopup(confirmationPopup);
    })
    .catch((err) => console.log(err))
    .finally(() =>
      setTimeout(() => renderLoading(false, btnConfirmSubmit, "Да"), 1000)
    );
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
