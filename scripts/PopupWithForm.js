import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitHandler) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._formElement = popupElement.querySelector('.edit-form');
    this._submitButton = popupElement.querySelector('.edit-form__submit-button');
  }

// собираем данные всех полей формы
  _getInputValues() {
    const inputs = this._formElement.querySelectorAll('.edit-form__input');
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

// добавляем обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

// закрываем и сбрасываем форму
  close() {
    super.close();
    this._formElement.reset();
  }
}
