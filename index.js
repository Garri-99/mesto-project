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

function handlerAvatarsubmit(evt) {
  evt.preventDefault();

  avatarIcon.src = avatarInput.value
  closePopup(avatarPopup)
}

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

// валидация форм

function showInputError(formElement, inputElement, errorMessage) {
  const errorEliment = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__field_error');
  errorEliment.textContent = errorMessage;
  errorEliment.classList.add('form__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__field_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement)
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));
  const buttonElement = formElement.querySelector('.form__submit')
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input',  () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid
   })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive');
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove('form__submit_inactive')
    buttonElement.removeAttribute('disabled')
  }
}

enableValidation();
