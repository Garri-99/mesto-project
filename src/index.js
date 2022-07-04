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
import { openPopup } from "./components/modal";
import { enableValidation, resetFormCondition } from "./components/validate";
import {
  submitEditProfileForm,
  submitAddCardForm,
  submitEditAvatar,
} from "./components/utils";
import { getInitialCards, getProfile } from "./components/api";
import { renderCard } from "./components/card";

getProfile()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    profileAvatar.src = res.avatar;
    profileName.textContent = res.name;
    profileActivity.textContent = res.about;
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    res.forEach((item) => {
      const isMyCard = item.owner._id === "e51fd23982df883c4969b504";
      const isLike = item.likes.some(
        (user) => user._id === "e51fd23982df883c4969b504"
      );
      renderCard(
        item.name,
        item.link,
        item.likes.length,
        item._id,
        isMyCard,
        isLike
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

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

profileAvatar.addEventListener("mouseover", () => {
  btnEditAvatar.style.visibility = "visible";
});

btnEditAvatar.addEventListener("mouseout", (evt) => {
  evt.target.style.visibility = "hidden";
});

btnEditAvatar.addEventListener("click", () => {
  formAvatar.reset();
  resetFormCondition(validationConfig, avatarPopup);
  openPopup(avatarPopup);
});

formProfile.addEventListener("submit", submitEditProfileForm);
formCard.addEventListener("submit", submitAddCardForm);
formAvatar.addEventListener("submit", submitEditAvatar);
