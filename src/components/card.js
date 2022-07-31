export class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleResetClick, myId },
    templateSelector
  ) {
    this._cardData = data;
    this._isMyCard = data.owner._id === myId;
    this._isLike = data.likes.some(user => user._id === myId);
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleResetClick = handleResetClick;
  }

cardlikehandler(res, card, evt){
  const likeCount = card.querySelector(".element__like-count")
  likeCount.textContent = res.likes.length;
  evt.target.classList.toggle("element__like_active");
}

deleteCard (card) {
  card.remove();
}

  _getElement() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  createCard() {

    const cardElement = this._getElement();
    const cardPic = cardElement.querySelector(".element__pic");
    const btnReset = cardElement.querySelector(".element__reset");
    const likeElement = cardElement.querySelector(".element__like");

    cardElement.id = this._cardData._id;
    cardPic.src = this._cardData.link;
    cardPic.alt = this._cardData.name;
    cardElement.querySelector(".element__text").textContent = this._cardData.name;

    cardPic.addEventListener("click", () => this._handleCardClick(this._cardData.name, this._cardData.link));

    likeElement.addEventListener("click", (evt) => this._handleLikeClick(evt));

    cardElement.querySelector(".element__like-count").textContent = this._cardData.likes.length;

    if (this._isLike) {
      likeElement.classList.add("element__like_active");
    }

    if (this._isMyCard) {
      btnReset.classList.add("element__reset_active");
      btnReset.addEventListener("click", (evt) => this._handleResetClick(evt));
    }
    this._cardElement = cardElement;
    return cardElement;
  }
}
