const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

const closePopupByEsc = (evt) => {
  if (evt.code == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    if (openedPopup) {
      closePopup(openedPopup)
    }
  }
};

const closePopupByClickOnOverlay = () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach(popup => {
    popup.addEventListener('click', evt => {
      if (evt.target == evt.currentTarget) {
        closePopup(popup)
      };
    });
  });
};

closePopupByClickOnOverlay()

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const fullscreenCaption = popupImage.querySelector('.popup__caption');
const fullscreenImage = popupImage.querySelector('.popup__image');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popupProfileInstance.close();
};

// import { popupImage, openPopup, fullscreenImage, fullscreenCaption } from './index.js';

  // _openImage() {
  //   fullscreenImage.src = this._link;
  //   fullscreenCaption.textContent = this._name;
  //   fullscreenImage.alt = this._name;
  //   openPopup(popupImage);
  // }
  this._cardImage.addEventListener('click', () => this._openImage());

  const templateElement = document.getElementById('card');

// listeners for popups functions
formProfile.addEventListener('submit', handleFormSubmit);

// popups functions
const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popupProfileInstance.close();
};

// добавление карточки на страницу
const handleAddCard = (evt) => {
  evt.preventDefault();
  const cardElement = createCard({ name: placeNameInput.value, link: placeImageInput.value });
  cardList.addItem(cardElement);
  evt.target.reset();
  popupCardInstance.close();
};

formCard.addEventListener('submit', handleAddCard);

// редактирование информации профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popupProfileInstance.close();
};

formProfile.addEventListener('submit', handleFormSubmit);
