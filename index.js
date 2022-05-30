const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");
const imagePopup = document.querySelector("#image-popup");
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-button");
const btnCloseProfilePopup = document.querySelector("#close-edit-popup");
const btnCloseCardPopup = document.querySelector("#close-add-popup");
const btnCloseImagePopup = document.querySelector("#close-image-popup");
const formProfile = document.querySelector("#form-profile");
const formCard = document.querySelector("#form-card");
const nameProfile = document.querySelector("#firstname");
const activityProfile = document.querySelector("#activity");
const titleCard = document.querySelector("#title");
const srcCard = document.querySelector("#url");
const profileName = document.querySelector(".profile__info-name");
const profileActivity = document.querySelector(".profile__info-activity");
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const popupPic = imagePopup.querySelector(".popup__pic");
const popupImageCaption = imagePopup.querySelector(".popup__image-caption");

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

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});
