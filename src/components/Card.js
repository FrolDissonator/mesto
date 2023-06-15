export default class Card {
  constructor(data, templateSelector, handleCardClick, handleLikeCard, handleRemoveLike, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleRemoveLike = handleRemoveLike;
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
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__like-button_active')) {
        this._handleRemoveLike(this._id);
      } else {
        this._handleLikeCard(this._id);
      }
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteButton.addEventListener('click', () => this._handleDeleteCard(this._id));
  }

  handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
    this._likeButton = null;
    this._cardImage = null;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._likesNumber = this._cardElement.querySelector('.card__likes-number');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');
    this._likeButton.title = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likesNumber.textContent = `${this._likes.length}`;

    this._setEventListeners();
    this._isLiked();
    this.isOwner();

    return this._cardElement;
  }

  isOwner() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  addLike() {
    this._likeButton.classList.add('card__like-button_active');
  }

  removeLike() {
    this._likeButton.classList.remove('card__like-button_active');
  }

  _isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this.addLike();
      } else {
        this.removeLike();
      }
    });
  }

  setLikesNumber(res) {
    this._likesNumber.textContent = `${res.likes.length}`;
  }
}
