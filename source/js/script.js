// Открытие мобильного меню

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// Открытие модального окна

var modalOverlay = document.querySelector('.modal');
var modalCard = document.querySelector('.modal__card');
var modalButtons = document.querySelectorAll('.modal-button');
var modalButtonArray = Array.prototype.slice.call(modalButtons);

if (document.querySelector('.modal')) {
  modalButtonArray.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      modalOverlay.classList.remove('visually-hidden');
      modalOverlay.classList.add('modal--open');
      modalCard.classList.add('modal__card--open');
      document.body.style.overflow = 'hidden';
      document.body.style.padding = '0 15px 0 0';
      if (modalCard.classList.contains('modal__card--open')) {
        window.addEventListener('click', function (e) {
          if (e.target === modalOverlay) {
            document.body.style.overflow = 'visible';
            document.body.style.padding = '0';
            modalOverlay.classList.remove('modal--open');
            modalCard.classList.remove('modal__card--open');
          }
        });
      }
    });
  });
}

// Управление картой

var mapPicture = document.querySelector('.contacts__map');
var mapGoogle = document.querySelector('.contacts__google-map');

mapPicture.classList.add('visually-hidden');
mapGoogle.classList.remove('visually-hidden');
