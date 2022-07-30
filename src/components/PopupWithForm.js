import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const inputList = this.popup.querySelectorAll(".form__field");
    const formValues = {};
    inputList.forEach(
      (input) => (formValues[input.name] = input.value)
    );
    return formValues
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup
      .querySelector(".form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitForm(this._getInputValues())
      });
  }

  close() {
    super.close();
    setTimeout(() => this.popup.querySelector(".form").reset(), 800);
  }
}
