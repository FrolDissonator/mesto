// popups
const popupProfile = document.querySelector(".popup_profile");
const popupCard = document.querySelector(".popup_card");

// popups close buttons
const popupProfileCloseButton = popupProfile.querySelector(".popup__close-button");
const popupCardCloseButton = popupCard.querySelector(".popup__close-button");

//popups open buttons
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupCardOpenButton = document.querySelector(".profile__add-button");

// edit form constants
const formProfile = document.querySelector(".edit-form_profile");
const nameInput = formProfile.querySelector(".edit-form__input_field_name");
const jobInput = formProfile.querySelector(".edit-form__input_field_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

// add form constants
const formCard = document.querySelector(".edit-form_card");
const placeNameInput = formCard.querySelector(".edit-form__input_field_place-name");
const placeImageInput = formCard.querySelector(".edit-form__input_field_place-image");

// cards constants
const cardsGrid = document.querySelector(".cards-grid");
const cardTemplate = document.getElementById("card").content;

// start cards array
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

// cards creation functions
function createCard (data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const placeImage = cardElement.querySelector(".card__image");
  const placeTitle = cardElement.querySelector(".card__title");

  placeImage.src = data.link;
  placeImage.alt = data.name;
  placeTitle.textContent = data.name;

  cardsGrid.append(cardElement);
  setEventListeners(cardElement);

  return cardElement;
};

initialCards.forEach (elem => {
  createCard(elem);
});

function handleAddCard (evt) {
  evt.preventDefault();

  const newCard = createCard({
    name: placeNameInput.value,
    link: placeImageInput.value
  });

  cardsGrid.prepend(newCard);
  evt.target.reset();
  closePopup(popupCard);
};


// cards deletion function
function handleDelete (evt) {
  const card = evt.target.closest(".card");
  card.remove();
};

// cards like function
function addLike (evt) {
  const like = evt.target.closest(".card").querySelector(".card__like-button");
  like.classList.toggle("card__like-button_active");
};

// listeners for cards functions
function setEventListeners (cardElement) {
  cardElement.querySelector(".card__delete-button").addEventListener("click", handleDelete);
  cardElement.querySelector(".card__like-button").addEventListener("click", addLike);
};

formCard.addEventListener("submit", handleAddCard);

// popups functions
const openPopup = function (popup) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  popup.classList.add("popup_opened");
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
};

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupProfile);
};


// listeners for popups functions
formProfile.addEventListener("submit", handleFormSubmit);

popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupProfile);
});

popupProfileCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupCardOpenButton.addEventListener("click", function () {
  openPopup(popupCard);
});

popupCardCloseButton.addEventListener("click", function () {
  closePopup(popupCard);
});
