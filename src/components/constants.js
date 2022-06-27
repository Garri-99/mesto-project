export const profilePopup = document.querySelector("#profile-popup");
export const cardPopup = document.querySelector("#card-popup");
export const imagePopup = document.querySelector("#image-popup");
export const btnEditProfile = document.querySelector(".profile__edit-button");
export const btnAddCard = document.querySelector(".profile__add-button");
export const btnCloseProfilePopup = document.querySelector("#close-edit-popup");
export const btnCloseCardPopup = document.querySelector("#close-add-popup");
export const btnCloseImagePopup = document.querySelector("#close-image-popup");
export const formProfile = document.querySelector("#form-profile");
export const formCard = document.querySelector("#form-card");
export const nameInput = document.querySelector("#firstname");
export const activityInput = document.querySelector("#activity");
export const titleCard = document.querySelector("#title");
export const srcCard = document.querySelector("#url");
export const profileName = document.querySelector(".profile__info-name");
export const profileActivity = document.querySelector(".profile__info-activity");
export const cardsContainer = document.querySelector(".elements");
export const cardTemplate = document.querySelector("#card-template").content;
export const popupPic = imagePopup.querySelector(".popup__pic");
export const popupImageCaption = imagePopup.querySelector(".popup__image-caption");
export const body = document.body;
export const popups = document.querySelectorAll('.popup');
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
