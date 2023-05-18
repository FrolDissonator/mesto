import Popup from "./Popup"

export default class PopupWithForm extends Popup {
  constructor(popupElement, { handleFormSubmit }) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._popupElement.querySelectorAll('.edit-form__input');
    this._formElement = this._popupElement.querySelector('.edit-form');
  }

// собираем данные всех полей формы
  _getInputValues() {
    const inputValues = {};
    formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

// добавляем обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

// закрываем и сбрасываем форму
  close() {
    super.close();
    formElement.reset();
  }
}
