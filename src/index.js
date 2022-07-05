import "./pages/index.css";
import {
  profilePopup,
  cardPopup,
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
  avatarPopup,
  formAvatar,
} from "./components/constants";
import {
  openPopup,
  submitEditProfileForm,
  submitAddCardForm,
  submitEditAvatar,
} from "./components/modal";
import { enableValidation, resetFormCondition } from "./components/validate";
import { getCards, getUserInfo } from "./components/api";
import { renderCard } from "./components/card";

let myId;

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    profileAvatar.src = userData.avatar;
    profileName.textContent = userData.name;
    profileActivity.textContent = userData.about;
    myId = userData._id;
    cards.forEach((card) => {
      const isMyCard = card.owner._id === myId;
      const isLike = card.likes.some((user) => user._id === myId);
      renderCard(
        card.name,
        card.link,
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
