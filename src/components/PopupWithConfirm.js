import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this._submitForm = submitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup
      .querySelector(".form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitForm(this._card)
      });
  }

  open(card) {
    super.open();
    this._card = card
  }
}
