const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".edit-form");
let nameInput = formElement.querySelector(".edit-form__input_field_name");
let jobInput = formElement.querySelector(".edit-form__input_field_description");
let profileName = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__subtitle");


const openPopup = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popupElement.classList.add("popup_opened");
};

const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
