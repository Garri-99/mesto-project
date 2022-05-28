const editPopup = document.querySelector("#edit-popup");
const addPopup = document.querySelector("#add-popup");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const closeEditBtn = document.querySelector("#closeEditPopup");
const closeAddBtn = document.querySelector("#closeAddPopup");
const formEdit = document.querySelector("#edit-form");
const formAdd = document.querySelector("#add-form");
const nameInput = document.querySelector(".form__field:first-of-type");
const jobInput = document.querySelector(".form__field:nth-of-type(2)");
const profileName = document.querySelector(".profile__info-name");
const profileActivity = document.querySelector(".profile__info-activity");
const elements = document.querySelector(".elements");

editBtn.addEventListener("click", toggleEditPopup);
addBtn.addEventListener("click", toggleAddPopup);
closeEditBtn.addEventListener("click", toggleEditPopup);
closeAddBtn.addEventListener("click", toggleAddPopup);
formEdit.addEventListener("submit", editSubmitHandler);
formAdd.addEventListener("submit", addSubmitHandler);

function toggleEditPopup() {
  editPopup.classList.toggle("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}

function toggleAddPopup() {
  addPopup.classList.toggle("popup_opened");
  formAdd.querySelector("#title").value = "";
  formAdd.querySelector("#url").value = "";
}

function editSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  toggleEditPopup();
}

function addCard(cardName, imgSrc) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__pic").src = imgSrc;
  cardElement.querySelector(".popup__pic").src = imgSrc;
  cardElement.querySelector(".element__text").textContent = cardName;
  cardElement.querySelector(".popup__image-caption").textContent = cardName;

  cardElement.querySelector(".element__pic").addEventListener("click", () => {
    cardElement.querySelector(".popup").classList.toggle("popup_opened");
  });
  cardElement.querySelector(".popup__close").addEventListener("click", () => {
    cardElement.querySelector(".popup").classList.toggle("popup_opened");
  });
  cardElement.querySelector(".element__like").addEventListener("click", evt => {
      evt.target.classList.toggle("element__like_active");
    });
  cardElement.querySelector(".element__reset").addEventListener("click", evt => {
      evt.target.parentElement.remove();
    });
  elements.prepend(cardElement);
}

function addSubmitHandler(evt) {
  evt.preventDefault();

  const name = formAdd.querySelector("#title");
  const src = formAdd.querySelector("#url");

  addCard(name.value, src.value);
  name.value = "";
  src.value = "";

  toggleAddPopup();
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

initialCards.forEach(item => {
  addCard(item.name, item.link)
})
