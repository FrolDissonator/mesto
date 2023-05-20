import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { profileName, profileDescription, popupProfile, popupCard, popupImage, formProfile,
  formCard, validationConfig, initialCards, cardsGrid, nameInput, jobInput, placeNameInput,
  placeImageInput, popupProfileOpenButton, popupCardOpenButton } from '../utils/constants.js';

// информация о профиле
const userInfo = new UserInfo(profileName, profileDescription);

// попапы
const popupProfileInstance = new Popup(popupProfile);
const popupCardInstance = new Popup(popupCard);
const popupImageInstance = new PopupWithImage(popupImage);

// валидация форм
const formProfileInstance = new FormValidator(formProfile, validationConfig);
const formCardInstance = new FormValidator(formCard, validationConfig);

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
  userInfo.setUserInfo(nameInput.value, jobInput.value);
  profilePopupInstance.close();
});

const cardPopupInstance = new PopupWithForm(popupCard, () => {
  const newCard = createCard({ name: placeNameInput.value, link: placeImageInput.value });
  cardsGrid.prepend(newCard);
  popupCardInstance.close();
});

// установка слушателей на кнопки открытия попапов
popupProfileOpenButton.addEventListener('click', () => {
  popupProfileInstance.open();
  userInfo.getUserInfo();
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
