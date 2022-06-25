import './pages/index.css';
import { initialCards } from './components/cards';
import { openPopup, closePopup } from './components/modal';
import { enableValidation } from './components/validate';

const avatarPopup = document.querySelector("#avatar-popup");
const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");
const imagePopup = document.querySelector("#image-popup");
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-button");
const avatarIcon = document.querySelector('.profile__avatar')
const btnCloseAvatarPopup = document.querySelector("#close-avatar-popup");
const btnCloseProfilePopup = document.querySelector("#close-edit-popup");
const btnCloseCardPopup = document.querySelector("#close-add-popup");
const btnCloseImagePopup = document.querySelector("#close-image-popup");
const formProfile = document.querySelector("#form-profile");
const formCard = document.querySelector("#form-card");
const formAvatar = document.querySelector('#form-avatar')
const nameProfile = document.querySelector("#firstname");
const activityProfile = document.querySelector("#activity");
const titleCard = document.querySelector("#title");
const srcCard = document.querySelector("#url");
const avatarInput = document.querySelector('#url-avatar')
const profileName = document.querySelector(".profile__info-name");
const profileActivity = document.querySelector(".profile__info-activity");
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const popupPic = imagePopup.querySelector(".popup__pic");
const popupImageCaption = imagePopup.querySelector(".popup__image-caption");
const popups = document.querySelectorAll('.popup');
const body = document.body;

function handlerAvatarsubmit(evt) {
  evt.preventDefault();

  avatarIcon.src = avatarInput.value
  closePopup(avatarPopup)
}

function editSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameProfile.value;
  profileActivity.textContent = activityProfile.value;
  closePopup(profilePopup);
}

function handlerCardClick(name, src) {
  popupPic.src = src;
  popupPic.alt = name;
  popupImageCaption.textContent = name;
  openPopup(imagePopup);
}

function handlerLikeClick(evt) {
  evt.target.classList.toggle("element__like_active");
}

function handlerResetClick(evt) {
  evt.target.closest(".element").remove();
}

function createCard(cardName, imgSrc) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardPic = cardElement.querySelector(".element__pic");

  cardPic.src = imgSrc;
  cardPic.alt = cardName;
  cardElement.querySelector(".element__text").textContent = cardName;

  cardPic.addEventListener("click", () => handlerCardClick(cardName, imgSrc));

  cardElement
    .querySelector(".element__like")
    .addEventListener("click", handlerLikeClick);

  cardElement
    .querySelector(".element__reset")
    .addEventListener("click", handlerResetClick);

  return cardElement;
}

function renderCard(name, src) {
  cardsContainer.prepend(createCard(name, src));
}

function addSubmitHandler(evt) {
  evt.preventDefault();

  renderCard(titleCard.value, srcCard.value);
  closePopup(cardPopup);
}

body.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
})

popups.forEach((popup) => {
  body.addEventListener('keydown', (evt) => {
    if (evt.key == 'Escape') {
      evt.preventDefault()
      closePopup(popup)
    }
  })
})

btnEditProfile.addEventListener("click", () => {
  nameProfile.value = profileName.textContent;
  activityProfile.value = profileActivity.textContent;
  openPopup(profilePopup);
});

btnCloseProfilePopup.addEventListener("click", () => closePopup(profilePopup));

formProfile.addEventListener("submit", editSubmitHandler);

btnAddCard.addEventListener("click", () => {
  formCard.reset();
  openPopup(cardPopup);
});

btnCloseCardPopup.addEventListener("click", () => closePopup(cardPopup));

formCard.addEventListener("submit", addSubmitHandler);

btnCloseImagePopup.addEventListener("click", () => closePopup(imagePopup));

btnCloseAvatarPopup.addEventListener("click", () => closePopup(avatarPopup));

formAvatar.addEventListener('submit', handlerAvatarsubmit)

avatarIcon.addEventListener('click', () => {
  openPopup(avatarPopup)
})

enableValidation();

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});
