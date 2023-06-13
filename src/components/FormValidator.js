export default class FormValidator {
  constructor(
    form,
    { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }
    ) {
    this._form = form;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  enableValidation() {
    this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._formButton = this._form.querySelector(this._submitButtonSelector);
    this._formSetEventListeners();
  }

  _formSetEventListeners() {
    this.disableButton();
    this._formInputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        if (this._hasInvalidInput()) {
          this.disableButton()
        } else {
          this._enableButton()
        }
      });
    });
  }

  _hasInvalidInput() {
    return this._formInputs.some(item => !item.validity.valid)
  }

  _checkInputValidity(input) {
    if (input.checkValidity()) {
      this._hideInputError(input)
    } else {
      this._showInputError(input)
    }
  }

  disableButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.setAttribute('disabled', true);
  }

  _enableButton() {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.removeAttribute('disabled');
  }

  _hideInputError(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showInputError(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  resetValidation() {
    this._formInputs.forEach(input => this._hideInputError(input));
    this.disableButton();
  }
}
