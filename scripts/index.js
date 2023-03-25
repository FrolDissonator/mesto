const popupElement = document.querySelector(".popup_profile");
const popupCardElement = document.querySelector(".popup_card");
const popupAddCardElement = document.querySelector(".popup_card");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupCardOpenButtonElement = document.querySelector(".profile__add-button");
const formElement = document.querySelector(".edit-form");
let nameInput = formElement.querySelector(".edit-form__input_field_name");
let jobInput = formElement.querySelector(".edit-form__input_field_description");
let profileName = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__subtitle");
const cardsGrid = document.querySelector(".cards-grid");
const cardTemplate = document.getElementById("card").content;

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

initialCards.forEach((data) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const placeImage = cardElement.querySelector(".card__image");
  const placeTitle = cardElement.querySelector(".card__title");

  placeImage.src = data.link;
  placeImage.alt = data.name;
  placeTitle.textContent = data.name;

  cardsGrid.append(cardElement);
  setEventListeners(cardElement);
});

function handleDelete (evt) {
  const card = evt.target.closest(".card");
  card.remove();
};

function addLike (evt) {
  const like = evt.target.closest(".card").querySelector(".card__like-button");
  like.classList.toggle("card__like-button_active");
};

function setEventListeners (cardElement) {
  cardElement.querySelector(".card__delete-button").addEventListener("click", handleDelete);
  cardElement.querySelector(".card__like-button").addEventListener("click", addLike);
};

const openPopup = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popupElement.classList.add("popup_opened");
};

const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}


formElement.addEventListener('submit', handleFormSubmit);
popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
popupCardOpenButtonElement.addEventListener("click", openPopup);
