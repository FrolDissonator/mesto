export const validationConfig = {
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__error-message'
};

// стартовый массив карточек
export const initialCards = [
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

// контейнер добавления карточек
export const cardsGrid = document.querySelector('.cards-grid');

// попапы
export const popupProfile = document.querySelector('.popup_profile');
export const popupCard = document.querySelector('.popup_card');
export const popupImage = document.querySelector('.popup_full-image');
export const popupDelete = document.querySelector('.popup_card-delete');
export const popupAvatar = document.querySelector('.popup_avatar');

// кнопки открытия попапов
export const popupProfileOpenButton = document.querySelector('.profile__edit-button');
export const popupCardOpenButton = document.querySelector('.profile__add-button');
export const cardDeleteButton = document.querySelectorAll('.card__delete-button');
export const popupAvatarOpenButton = document.querySelector('.profile__avatar-button');

// константы формы заполнения профиля
export const formProfile = popupProfile.querySelector('.edit-form_profile');
export const nameInput = formProfile.querySelector('.edit-form__input_field_name');
export const jobInput = formProfile.querySelector('.edit-form__input_field_description');
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');
export const formAvatar = popupAvatar.querySelector('.edit-form_avatar');

// константа формы добавления карточек
export const formCard = document.querySelector('.edit-form_card');
