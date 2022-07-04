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
import { closePopup } from "./modal";

function renderLoading(isLoading, btnSubmit, text = "Сохрнить") {
  if (isLoading) {
    btnSubmit.value = "Сохранение...";
  } else {
    btnSubmit.value = text;
  }
}

export function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  renderLoading(true, btnProfileSubmit);
  patchEditProfile(nameInput.value, activityInput.value).finally(() =>
    renderLoading(false, btnProfileSubmit)
  );
  closePopup(profilePopup);
}

export function submitAddCardForm(evt) {
  evt.preventDefault();

  renderLoading(true, btnCardSubmit);
  postAddCard(titleCard.value, srcCard.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) =>
      renderCard(res.name, res.link, res.likes.length, res._id, res.owner._id)
    )
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, btnCardSubmit, "Создать"));
  closePopup(cardPopup);
}

export function submitEditAvatar(evt) {
  evt.preventDefault();

  renderLoading(true, btnAvatarSubmit);
  profileAvatar.src = avatarInput.value;
  patchEditAvatar(avatarInput.value).finally(() =>
    renderLoading(false, btnAvatarSubmit)
  );
  closePopup(avatarPopup);
}
