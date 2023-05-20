import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupImage = popupElement.querySelector('.popup__image');
    this._popupCaption = popupElement.querySelector('.popup__caption');
  }

// вставляем в попап картинку с src изображения и подписью к картинке
  open(link, caption) {
    this._popupImage.src = link;
    this._popupImage.alt = caption;
    this._popupCaption.textContent = caption;
    super.open();
  }
}
