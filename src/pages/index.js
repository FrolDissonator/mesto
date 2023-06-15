import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { profileName, profileDescription, popupProfile, popupCard, popupImage,
  formProfile, formCard, validationConfig, cardsGrid, nameInput, jobInput,
  popupProfileOpenButton, popupCardOpenButton, popupDelete, popupAvatar,
  formAvatar, profileAvatar, popupAvatarOpenButton } from '../utils/constants.js';
import './index.css';

// API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '55a7a843-6921-4e57-a5ce-a799145bca9d',
    'Content-Type': 'application/json'
  }
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));

// информация о профиле
const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

// попап редкатирования информации профиля
const popupProfileInstance = new PopupWithForm(popupProfile, async (data) => {
  popupProfileInstance.renderLoading(true)
  try {
    const res = await api.setUserInfo(data);
    userInfo.setUserInfo(res);
    popupProfileInstance.close();
  } catch (err) {
    console.warn(err)
  } finally {
    popupProfileInstance.renderLoading(false);
  }
});

// попап установки аватара
const popupAvatarInstance = new PopupWithForm(popupAvatar, async (data) => {
  popupAvatarInstance.renderLoading(true)
    try {
      const res = await api.setUserAvatar(data);
      userInfo.setUserAvatar(res);
      popupAvatarInstance.close();
    } catch (err) {
      console.warn(err)
    } finally {
      popupAvatarInstance.renderLoading(false);
    }
});

// попап открытия фотографии карточки
const popupImageInstance = new PopupWithImage(popupImage);

// попап добавления карточки
const popupCardInstance = new PopupWithForm(popupCard, async (data) => {
  popupCardInstance.renderLoading(true);
  try {
    const res = await api.addNewCard(data);
    const card = createCard(res);
    cardList.addItem(card);
    popupCardInstance.close();
  } catch (err) {
    console.warn(err)
  } finally {
    popupCardInstance.renderLoading(false);
  }
});

// попап подтверждения удаления карточки
const popupDeleteInstance = new PopupWithConfirmation(popupDelete, async (card) => {
  try {
    await api.deleteCard(card._id);
    card.handleDelete();
    popupDeleteInstance.close();
  } catch (err) {
    console.warn(err)
  }
});

// создание карточки
const cardList = new Section({
  renderer: (data) => {
    const card = createCard(data);
    cardList.addItem(card)
  }
}, cardsGrid);

const createCard = (data) => {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      userId,
      ownerId: data.owner._id,
      id: data._id
    },
    '#card',
    (name, link) => {
      popupImageInstance.open(link, name)
    },
    async () => {
      try {
        const res = await api.putLike(data._id);
        card.addLike();
        card.setLikesNumber(res);
      } catch (err) {
        console.warn(err)
      }
    },
    async () => {
      try {
        const res = await api.deleteLike(data._id);
        card.removeLike();
        card.setLikesNumber(res);
      } catch (err) {
        console.warn(err)
      }
    },
    () => {
      popupDeleteInstance.open(card)
    }
  );

  return card.generateCard();
};

// валидация форм
const formProfileInstance = new FormValidator(formProfile, validationConfig);
const formCardInstance = new FormValidator(formCard, validationConfig);
const formAvatarInstance = new FormValidator(formAvatar, validationConfig);

formProfileInstance.enableValidation();
formCardInstance.enableValidation();
formAvatarInstance.enableValidation();

// установка слушателей на кнопки открытия попапов
popupCardOpenButton.addEventListener('click', () => {
  formCardInstance.resetValidation();
  popupCardInstance.open();
});

popupProfileOpenButton.addEventListener('click', () => {
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.description;
  formProfileInstance.resetValidation();
  popupProfileInstance.open();
});

popupAvatarOpenButton.addEventListener('click', () => {
  formAvatarInstance.resetValidation();
  popupAvatarInstance.open();
});

// установка слушателей на попапы
popupProfileInstance.setEventListeners();
popupCardInstance.setEventListeners();
popupImageInstance.setEventListeners();
popupAvatarInstance.setEventListeners();
popupDeleteInstance.setEventListeners();
