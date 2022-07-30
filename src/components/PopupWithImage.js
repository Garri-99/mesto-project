import { popupPic, popupImageCaption } from "./constants";
import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
      super(popupSelector)
    }

  open(name, src) {
    popupPic.src = src;
    popupPic.alt = name;
    popupImageCaption.textContent = name;
    super.open();
  }
}
