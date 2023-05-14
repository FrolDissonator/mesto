import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';

const validationConfig = {
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__error-message'
};

// popups
const popupProfile = document.querySelector('.popup_profile');
const popupProfileInstance = new Popup(popupProfile);
const popupCard = document.querySelector('.popup_card');
const popupCardInstance = new Popup(popupCard);
const popupImage = document.querySelector('.popup_full-image');
const fullscreenCaption = popupImage.querySelector('.popup__caption');
const fullscreenImage = popupImage.querySelector('.popup__image');

//popups open and close buttons
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// edit form constants
const formProfile = document.querySelector('.edit-form_profile');
const nameInput = formProfile.querySelector('.edit-form__input_field_name');
const jobInput = formProfile.querySelector('.edit-form__input_field_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const formProfileInstance = new FormValidator(formProfile, validationConfig);

// add form constants
const formCard = document.querySelector('.edit-form_card');
const placeNameInput = formCard.querySelector('.edit-form__input_field_place-name');
const placeImageInput = formCard.querySelector('.edit-form__input_field_place-image');
const formCardInstance = new FormValidator(formCard, validationConfig);

// Constants
const cardsGrid = document.querySelector('.cards-grid');

// Start cards array
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// create cards
const cardList = new Section({
  items: initialCards,
  renderer: (item, container) => {
    const card = new Card(item, '#card');
    const cardElement = card.generateCard();
    container.append(cardElement);
  }
}, '.cards-grid');
cardList.renderItems();

// add card
const handleAddCard = (evt) => {
  evt.preventDefault();

  const card = new Card({name: placeNameInput.value, link: placeImageInput.value}, '#card');
  const newCardElement = card.generateCard();

  cardList.addItem(newCardElement);
  evt.target.reset();
  popupCardInstance.close();
};

formCard.addEventListener('submit', handleAddCard);

// popups functions


const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popupProfileInstance.close();
};

// listeners for popups functions
formProfile.addEventListener('submit', handleFormSubmit);

popupProfileOpenButton.addEventListener('click', () => {
  popupProfileInstance.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

popupCardOpenButton.addEventListener('click', () => {
  formCard.reset();
  formCardInstance.disableButton();
  popupCardInstance.open();
});


formProfileInstance.enableValidation();
formCardInstance.enableValidation();
popupProfileInstance.setEventListeners();
popupCardInstance.setEventListeners();

export { popupImage, fullscreenCaption, fullscreenImage };
