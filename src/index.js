import "./pages/index.css";
import {
  btnAddCard,
  btnEditProfile,
  formCard,
  formProfile,
  profileName,
  profileActivity,
  profileAvatar,
  nameInput,
  activityInput,
  validationConfig,
  btnEditAvatar,
  formAvatar,
  btnProfileSubmit,
  btnCardSubmit,
  btnAvatarSubmit,
  btnConfirmSubmit,
} from "./components/constants";
import { FormValidator } from "./components/FormValidator";
import { Card } from "./components/Card";
import { Section } from "./components/Section";
import { PopupWithImage } from "./components/PopupWithImage";
import { PopupWithForm } from "./components/PopupWithForm";
import { renderLoading } from "./components/utils";
import { PopupWithConfirm } from "./components/PopupWithConfirm";
import { Api } from "./components/Api.js";
import { UserInfo } from "./components/UserInfo";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
    "Content-Type": "application/json",
  },
});

const user = new UserInfo(
  { profileName, profileActivity, profileAvatar },
  {
    apiGetUserInfo: api.getUserInfo.bind(api),
    apiPatchEditProfile: api.patchEditProfile.bind(api),
  }
);

const validateFormProfile = new FormValidator(validationConfig, formProfile);
const validateFormCard = new FormValidator(validationConfig, formCard);
const validateFormAvatar = new FormValidator(validationConfig, formAvatar);
validateFormProfile.enableValidation();
validateFormCard.enableValidation();
validateFormAvatar.enableValidation();

let myId;

const cardsSection = new Section((data) => {
  const newCard = new Card(
    {
      data,
      myId,
      handleCardClick: popupImage.open.bind(popupImage),
      handleResetClick: (evt) => {
        popupConfirm.open(evt.target.closest(".element"));
      },
      handleLikeClick: (evt) => {
        const card = evt.target.closest(".element");
        const likeCount = card.querySelector(".element__like-count");
        if (!evt.target.classList.contains("element__like_active")) {
          api
            .putLike(card.id)
            .then((res) => {
              likeCount.textContent = res.likes.length;
              evt.target.classList.toggle("element__like_active");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .deleteLike(card.id)
            .then((res) => {
              likeCount.textContent = res.likes.length;
              evt.target.classList.toggle("element__like_active");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    "#card-template"
  );
  cardsSection.addItem(newCard.createCard());
}, ".elements");

const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

const popupProfile = new PopupWithForm("#profile-popup", (formValues) => {
  renderLoading(true, btnProfileSubmit);
  user
    .setUserInfo(formValues.firstname, formValues.activity)
    .then(() => {
      popupProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() =>
      setTimeout(() => renderLoading(false, btnProfileSubmit), 1000)
    );
});
popupProfile.setEventListeners();

const popupCard = new PopupWithForm("#card-popup", (formValues) => {
  renderLoading(true, btnCardSubmit);
  api
    .postAddCard(formValues.title, formValues.url)
    .then((res) => {
      cardsSection.renderItems([res]);
      popupCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() =>
      setTimeout(() => renderLoading(false, btnCardSubmit, "Создать"), 1000)
    );
});
popupCard.setEventListeners();

const popupAvatar = new PopupWithForm("#avatar-popup", (formValues) => {
  renderLoading(true, btnAvatarSubmit);
  api
    .patchEditAvatar(formValues["url-avatar"])
    .then(() => {
      profileAvatar.src = formValues["url-avatar"];
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() =>
      setTimeout(() => renderLoading(false, btnAvatarSubmit), 1000)
    );
});
popupAvatar.setEventListeners();
