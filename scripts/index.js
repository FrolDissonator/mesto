// popups
const popupProfile = document.querySelector(".popup_profile");
const popupCard = document.querySelector(".popup_card");
const popupImage = document.querySelector(".popup_full-image");

//popups open and close buttons
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupCardOpenButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");

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

// open card constants
const fullscreenImage = popupImage.querySelector(".popup__image");
const fullscreenCaption = popupImage.querySelector(".popup__caption");

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
const createCard = (data) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const placeImage = cardElement.querySelector(".card__image");
  const placeTitle = cardElement.querySelector(".card__title");

  placeImage.src = data.link;
  placeImage.alt = data.name;
  placeTitle.textContent = data.name;

  cardsGrid.append(cardElement);
  setEventListeners(cardElement);
  cardElement.querySelector(".card__image").addEventListener("click", () => openImage(data));

  return cardElement;
};

initialCards.forEach (elem => {
  createCard(elem);
});

const handleAddCard = (evt) => {
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

// open card image function
const openImage = (data) => {
  fullscreenImage.src = data.link;
  fullscreenCaption.textContent = data.name;
  fullscreenImage.alt = data.name;
  openPopup(popupImage);
};

// listeners for cards functions
function setEventListeners (cardElement) {
  cardElement.querySelector(".card__delete-button").addEventListener("click", handleDelete);
  cardElement.querySelector(".card__like-button").addEventListener("click", addLike);
};

formCard.addEventListener("submit", handleAddCard);

// popups functions
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupProfile);
};

const closePopupByEsc = (evt) => {
  if (evt.code == "Escape") {
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

// listeners for popups functions
formProfile.addEventListener("submit", handleFormSubmit);

popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

popupCardOpenButton.addEventListener("click", function () {
  openPopup(popupCard);
});

popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

