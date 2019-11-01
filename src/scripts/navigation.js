const nav = document.querySelectorAll('.nav');

for (i = 0; i < nav.length; i++) {
  nav[i].addEventListener('click', (e) => {
    e.preventDefault();
    const destination = document.getElementById(e.target.dataset.path);
    scrollTo(destination);

    const classes = e.target.closest('.nav').classList;
    
    for (i = 0; i < classes.length; i++) {
      if (classes[i] == "active") {
        trigerNavMenuPopup();
      }
    }
  })
};

function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop
  });
};

const scrollButton = document.getElementById('scroll');

scrollButton.addEventListener('click', (e) => {
  e.preventDefault();
  const about = document.getElementById('about');
  scrollTo(about);
});

const navMenuPopup = document.querySelector('.menu__popup');
const navHeader = document.querySelector('.nav_header');
const body = document.body;

function trigerNavMenuPopup() {
  navMenuPopup.classList.toggle('active');
  navHeader.classList.toggle('active');
  body.classList.toggle('active');
}

navMenuPopup.addEventListener('click', function () {
  trigerNavMenuPopup();
});
