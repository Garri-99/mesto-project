import {
  imagePopup,
  popupPic,
  popupImageCaption,
  cardTemplate,
} from "./constants";
import { openPopup } from "./modal";

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

export function createCard(cardName, imgSrc) {
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
