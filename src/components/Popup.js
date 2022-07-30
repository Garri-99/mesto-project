export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }

  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }

  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      this.close();
    }
  }

  setEventListeners() {
    this.popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
