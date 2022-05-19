const editPopup = document.querySelector('#edit-popup');
const addPopup = document.querySelector('#add-popup');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeEditBtn = document.querySelector('#closeEditPopup');
const closeAddBtn = document.querySelector('#closeAddPopup');
const formEdit = document.querySelector('#edit-form');
const formAdd = document.querySelector('#add-form');
const nameInput = document.querySelector('.form__field:first-of-type');
const jobInput = document.querySelector('.form__field:nth-of-type(2)');
const profileName = document.querySelector('.profile__info-name');
const profileActivity = document.querySelector('.profile__info-activity');
const likeBtn = document.querySelector('.element__like');

editBtn.addEventListener('click', toggleEditPopup);
addBtn.addEventListener('click', toggleAddPopup);
closeEditBtn.addEventListener('click', toggleEditPopup);
closeAddBtn.addEventListener('click', toggleAddPopup);
formEdit.addEventListener('submit', editSubmitHandler);
// formAdd.addEventListener('submit', addSubmitHandler);
likeBtn.addEventListener('click', toggleLike)


function toggleEditPopup() {
  editPopup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}

function toggleAddPopup() {
  addPopup.classList.toggle('popup_opened');
}

function editSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;
  toggleEditPopup()
}

formEdit.addEventListener('submit', editSubmitHandler);

// function addSubmitHandler (evt) {
//   evt.preventDefault();

//   toggleAddPopup()
// }

function toggleLike() {
    likeBtn.classList.toggle('element__like_active');
}
