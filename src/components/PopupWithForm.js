import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitHandler) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._formElement = popupElement.querySelector('.edit-form');
    this._submitButton = popupElement.querySelector('.edit-form__submit-button');
    this._inputList = popupElement.querySelectorAll('.edit-form__input');
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
