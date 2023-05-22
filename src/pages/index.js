import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { profileName, profileDescription, popupProfile, popupCard, popupImage,
  formProfile,formCard, validationConfig, initialCards, cardsGrid, nameInput,
  jobInput, popupProfileOpenButton, popupCardOpenButton } from '../utils/constants.js';
import './index.css';

// информация о профиле
const userInfo = new UserInfo(profileName, profileDescription);

// попапы
const popupImageInstance = new PopupWithImage(popupImage);

const popupProfileInstance = new PopupWithForm(popupProfile, (inputValues) => {
  userInfo.setUserInfo(inputValues['profile-name'], inputValues['profile-description']);
  popupProfileInstance.close();
});

const popupCardInstance = new PopupWithForm(popupCard, (inputValues) => {
  const newCard = createCard(inputValues);
  cardList.addItem(newCard);
  popupCardInstance.close();
});

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
};

// добавление на страницу стартовых карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item, container) => {
    const cardElement = createCard(item);
    container.append(cardElement);
  }
}, cardsGrid);

cardList.renderItems();

// установка слушателей на кнопки открытия попапов
popupCardOpenButton.addEventListener('click', () => {
  formCardInstance.disableButton();
  popupCardInstance.open();
});

popupProfileOpenButton.addEventListener('click', () => {
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.description;
  popupProfileInstance.open();
});


formProfileInstance.enableValidation();
formCardInstance.enableValidation();
popupProfileInstance.setEventListeners();
popupCardInstance.setEventListeners();
popupImageInstance.setEventListeners();

