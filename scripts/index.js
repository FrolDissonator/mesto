import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


const validationConfig = {
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__error-message'
};

// попапы
const popupProfile = document.querySelector('.popup_profile');
const popupProfileInstance = new Popup(popupProfile);
const popupCard = document.querySelector('.popup_card');
const popupCardInstance = new Popup(popupCard);
const popupImage = document.querySelector('.popup_full-image');
const popupImageInstance = new PopupWithImage(popupImage);


// кнопки открытия попапов
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupCardOpenButton = document.querySelector('.profile__add-button');

// константы формы заполнения профиля
const formProfile = document.querySelector('.edit-form_profile');
const nameInput = formProfile.querySelector('.edit-form__input_field_name');
const jobInput = formProfile.querySelector('.edit-form__input_field_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const formProfileInstance = new FormValidator(formProfile, validationConfig);
const profileInfo = new UserInfo(profileName, profileDescription);

// константы формы добавления карточек
const formCard = document.querySelector('.edit-form_card');
const placeNameInput = formCard.querySelector('.edit-form__input_field_place-name');
const placeImageInput = formCard.querySelector('.edit-form__input_field_place-image');
const formCardInstance = new FormValidator(formCard, validationConfig);

// Constants
const cardsGrid = document.querySelector('.cards-grid');

// стартовый массив карточек
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

// создание карточки
const createCard = ({ name, link }) => {
  const card = new Card(
    {name, link},
    '#card',
    (name, link) => { popupImageInstance.open(link, name) }
  );
  return card.generateCard();
}

// добавление на страницу стартовых карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item, container) => {
    const cardElement = createCard(item);
    container.append(cardElement);
  }
}, cardsGrid);

cardList.renderItems();

// создание экземпляров класса PopupWithForm
const profilePopupInstance = new PopupWithForm(popupProfile, () => {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  profilePopupInstance.close();
});

const cardPopupInstance = new PopupWithForm(popupCard, () => {
  const newCard = createCard({ name: placeNameInput.value, link: placeImageInput.value });
  cardsGrid.prepend(newCard);
  popupCardInstance.close();
});

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

// установка слушателей для попапов с формами
popupProfileOpenButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  profilePopupInstance.open();
});

popupCardOpenButton.addEventListener('click', () => {
  cardPopupInstance.open();
});

formProfileInstance.enableValidation();
formCardInstance.enableValidation();
popupProfileInstance.setEventListeners();
popupCardInstance.setEventListeners();
popupImageInstance.setEventListeners();
profilePopupInstance.setEventListeners();
cardPopupInstance.setEventListeners();
