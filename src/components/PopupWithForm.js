import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = popupSelector.querySelector('.edit-form');
    this._submitButton = popupSelector.querySelector('.edit-form__submit-button');
    this._inputList = popupSelector.querySelectorAll('.edit-form__input');
    this._submitButton = popupSelector.querySelector('.edit-form__submit-button');
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  renderLoading(isLoading, text) {
    this._submitButtonText = this._submitButton.textContent;
    if (isLoading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
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
