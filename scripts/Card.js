import { popupImage, openPopup, fullscreenImage, fullscreenCaption } from './index.js';

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.card__delete-button').addEventListener('click', () => this._handleDelete());
    this._cardElement.querySelector('.card__like-button').addEventListener('click', () => this._addLike());
    this._cardElement.querySelector('.card__image').addEventListener('click', () => this._openImage());
  }

  _handleDelete() {
    this._cardElement.remove();
  }

  _addLike() {
    this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _openImage() {
    fullscreenImage.src = this._link;
    fullscreenCaption.textContent = this._name;
    fullscreenImage.alt = this._name;
    openPopup(popupImage);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    const placeImage = this._cardElement.querySelector('.card__image');
    const placeTitle = this._cardElement.querySelector('.card__title');

    placeImage.src = this._link;
    placeImage.alt = this._name;
    placeTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
};

export default Card
