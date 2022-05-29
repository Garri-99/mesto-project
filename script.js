const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");
const imagePopup = document.querySelector("#image-popup");
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-button");
const btnCloseProfilePopup = document.querySelector("#close-edit-popup");
const btnCloseCardPopup = document.querySelector("#close-add-popup");
const btnCloseImagePopup = document.querySelector('#close-image-popup');
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
const popupPic = imagePopup.querySelector('.popup__pic');
const popupImageCaption = imagePopup.querySelector('.popup__image-caption')

btnEditProfile.addEventListener("click", () => {
  openPopup(profilePopup);
  nameProfile.value = profileName.textContent;
  activityProfile.value = profileActivity.textContent;
});
btnCloseProfilePopup.addEventListener("click", () => closePopup(profilePopup));
formProfile.addEventListener("submit", editSubmitHandler);

btnAddCard.addEventListener("click", () => {
  formCard.reset()
  openPopup(cardPopup)
});
btnCloseCardPopup.addEventListener("click", () => {
    closePopup(cardPopup)
  }
);
formCard.addEventListener("submit", addSubmitHandler);

btnCloseImagePopup.addEventListener('click', () => closePopup(imagePopup));

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

function createCard(cardName, imgSrc) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__pic").src = imgSrc;
  cardElement.querySelector(".element__pic").alt = cardName;
  cardElement.querySelector(".element__text").textContent = cardName;

  cardElement.querySelector(".element__pic").addEventListener("click", () => {
    popupPic.src = imgSrc;
    popupPic.alt = cardName;
    popupImageCaption.textContent = cardName;
    openPopup(imagePopup)
  });
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like_active");
    });
  cardElement
    .querySelector(".element__reset")
    .addEventListener("click", (evt) => {
      evt.target.closest('.element').remove();
    });

    return cardElement
}

function renderCard(name, src) {
  cardsContainer.prepend(createCard(name, src));
}

function addSubmitHandler(evt) {
  evt.preventDefault();

  renderCard(titleCard.value, srcCard.value);

  closePopup(cardPopup);
}

const initialCards = [
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

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});
