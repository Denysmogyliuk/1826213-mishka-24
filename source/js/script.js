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

var modalOverlay = document.querySelector(".modal__wrapper");
var modalCart = modalOverlay.querySelector(".modal");
var modalButtons = document.querySelectorAll(".modal-button");
var modalButtonArray = Array.prototype.slice.call(modalButtons);

if (document.querySelector(".modal__wrapper")) {
  modalButtonArray.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      modalOverlay.classList.remove("visually-hidden");
      modalOverlay.classList.add("modal__wrapper--open");
      modalCart.classList.add("modal--open");
      document.body.style.overflow = "hidden";
      if (modalCart.classList.contains("modal--open")) {
        window.addEventListener("click", function (e) {
          if (e.target === modalOverlay) {
            document.body.style.overflow = "visible";
            modalOverlay.classList.remove("modal__wrapper--open");
            modalCart.classList.remove("modal--open");
          }
        });
      }
    });
  });
}
