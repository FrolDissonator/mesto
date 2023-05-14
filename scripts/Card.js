import { popupImage, openPopup, fullscreenImage, fullscreenCaption } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardElement = null;
    this._likeButton = null;
    this._cardImage = null;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._addLike());
    this._cardImage.addEventListener('click', () => this._openImage());
    this._cardElement.querySelector('.card__delete-button').addEventListener('click', () => this._handleDelete());
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
    this._likeButton = null;
    this._cardImage = null;
  }

  _addLike() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _openImage() {
    fullscreenImage.src = this._link;
    fullscreenCaption.textContent = this._name;
    fullscreenImage.alt = this._name;
    openPopup(popupImage);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._cardImage = this._cardElement.querySelector('.card__image');

    this._likeButton.title = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
};

