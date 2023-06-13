import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._submitButton = popupSelector.querySelector('.edit-form__submit-button');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    });
  }
}
