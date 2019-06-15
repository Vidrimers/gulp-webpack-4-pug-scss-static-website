export default function() {
  const page = document.querySelector('.js-page');

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 15) {
      page.classList.add('isScrolled')
    } else {
      page.classList.remove('isScrolled')
    }
  }, false);
}
