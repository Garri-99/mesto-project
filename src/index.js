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


        card.likes.length,
        card._id,
        isMyCard,
        isLike
      );
    });
  })
  .catch((err) => console.log(err));

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

btnEditAvatar.addEventListener("click", () => {
  formAvatar.reset();
  resetFormCondition(validationConfig, avatarPopup);
  openPopup(avatarPopup);
});

formProfile.addEventListener("submit", submitEditProfileForm);
formCard.addEventListener("submit", submitAddCardForm);
formAvatar.addEventListener("submit", submitEditAvatar);
formConfirm.addEventListener("submit", submitConfirmDelete)
