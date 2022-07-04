import { deleteCard, deleteLike, putLike } from "./api";
import {
  imagePopup,
  popupPic,
  popupImageCaption,
  cardTemplate,
  cardsContainer,
} from "./constants";
import { openPopup } from "./modal";

function handlerCardClick(name, src) {
  popupPic.src = src;
  popupPic.alt = name;
  popupImageCaption.textContent = name;
  openPopup(imagePopup);
}

function handlerLikeClick(evt) {
  const card = evt.target.closest(".element");
  const likeCount = card.querySelector(".element__like-count");
  evt.target.classList.toggle("element__like_active");
  if (evt.target.classList.contains("element__like_active")) {
    putLike(card.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => (likeCount.textContent = res.likes.length))
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLike(card.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => (likeCount.textContent = res.likes.length))
      .catch((err) => {
        console.log(err);
      });
  }
}

function handlerResetClick(evt) {
  evt.target.closest(".element").remove();
  deleteCard(evt.target.closest(".element").id);
}

function createCard(cardName, imgSrc, count, id, isMyCard, isLike = false) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardPic = cardElement.querySelector(".element__pic");
  const btnReset = cardElement.querySelector(".element__reset");
  const likeElement = cardElement.querySelector(".element__like");

  cardElement.id = id;
  cardPic.src = imgSrc;
  cardPic.alt = cardName;
  cardElement.querySelector(".element__text").textContent = cardName;

  cardPic.addEventListener("click", () => handlerCardClick(cardName, imgSrc));

  likeElement.addEventListener("click", handlerLikeClick);

  cardElement.querySelector(".element__like-count").textContent = count;

  if (isLike) {
    likeElement.classList.add("element__like_active");
  }

  if (isMyCard) {
    btnReset.classList.add("element__reset_active");
    btnReset.addEventListener("click", handlerResetClick);
  }
  return cardElement;
}

export function renderCard(
  name,
  src,
  count,
  id,
  isMyCard = false,
  isLike = false
) {
  cardsContainer.prepend(createCard(name, src, count, id, isMyCard, isLike));
}
