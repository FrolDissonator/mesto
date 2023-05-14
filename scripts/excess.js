const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

const closePopupByEsc = (evt) => {
  if (evt.code == 'Escape') {
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

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
