import {
  body,
  popups,
  btnCloseProfilePopup,
  btnCloseCardPopup,
  btnCloseImagePopup,
  profilePopup,
  cardPopup,
  imagePopup,
} from "./constants";

function handlerEsc(evt) {
  if (evt.key === "Escape") {
    evt.preventDefault();
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  body.addEventListener("keydown", handlerEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  body.removeEventListener("keydown", handlerEsc);
}

body.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
});

btnCloseProfilePopup.addEventListener("click", () => closePopup(profilePopup));
btnCloseCardPopup.addEventListener("click", () => closePopup(cardPopup));
btnCloseImagePopup.addEventListener("click", () => closePopup(imagePopup));
