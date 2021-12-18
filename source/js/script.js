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

const STATES = {
  OPENED: "opened",
  CLOSED: "closed"
};

const openDialogButton = document.querySelector(".popular-product__order-button");
const dialog = document.querySelector('.modal');

openDialogButton.addEventListener('click', () => {
  dialog.setAttribute("data-state", STATES.OPENED);
  dialog.showModal();

  dialog.addEventListener("click", (e) => {
    const { target, clientX, clientY } = e;

    const rect = target.getBoundingClientRect();
    const minX = rect.left + target.clientLeft;
    const minY = rect.top + target.clientTop;
    const isClickedOutsideByWidth = clientX < minX || clientX >= minX + target.clientWidth;
    const isClickedOutsideByHeight = clientY < minY || clientY >= minY + target.clientHeight;

    if ( isClickedOutsideByWidth || isClickedOutsideByHeight) {
      target.close();
      dialog.setAttribute("data-state", STATES.CLOSED)
    }
  })
})

