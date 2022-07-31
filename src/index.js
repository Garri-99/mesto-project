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

const user = new UserInfo({ profileName, profileActivity, profileAvatar });

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
        if (!evt.target.classList.contains("element__like_active")) {
          api
            .putLike(card.id)
            .then((res) => {
              newCard.cardlikehandler(res, card, evt);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .deleteLike(card.id)
            .then((res) => {
              newCard.cardlikehandler(res, card, evt);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    "#card-template"
  );
  return newCard.createCard();
}, ".elements");

const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

const popupProfile = new PopupWithForm("#profile-popup", (formValues) => {
  renderLoading(true, btnProfileSubmit);
  user
    .api.patchEditProfile(formValues.firstname, formValues.activity)
    .then(() => {
      user.setUserInfo(formValues.firstname, formValues.activity);
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
      cardsSection.addItem(res);
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
      user.setUserAvatar(formValues["url-avatar"]);
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() =>
      setTimeout(() => renderLoading(false, btnAvatarSubmit), 1000)
    );
});
popupAvatar.setEventListeners();

const popupConfirm = new PopupWithConfirm("#confirm-popup", (card) => {
  renderLoading(true, btnConfirmSubmit, null, "Удаление...");
  api
    .deleteCard(card.id)
    .then(() => {
      card.remove();
      popupConfirm.close();
    })
    .catch((err) => console.log(err))
    .finally(() =>
      setTimeout(() => renderLoading(false, btnConfirmSubmit, "Да"), 1000)
    );
});
popupConfirm.setEventListeners();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData.name, userData.about)
    user.setUserAvatar(userData.avatar);
    console.log(userData.avatar)
    myId = userData._id;
    cardsSection.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));

btnEditProfile.addEventListener("click", () => {
    nameInput.value = user.getUserInfo().name;
    activityInput.value = user.getUserInfo().activity;
    validateFormProfile.resetFormCondition();
    popupProfile.open();
});

btnAddCard.addEventListener("click", () => {
  validateFormCard.resetFormCondition();
  popupCard.open();
});

btnEditAvatar.addEventListener("click", () => {
  formAvatar.reset();
  validateFormAvatar.resetFormCondition();
  popupAvatar.open();
});
