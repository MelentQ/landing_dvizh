export default function animations() {
  const animatedElements = document.querySelectorAll('.js-animation');
  if (!animatedElements) return;

  window.addEventListener('scroll', animOnScroll);
  animOnScroll();

  function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  function animOnScroll() {
    animatedElements.forEach(elem => {
      const elemHeight = elem.offsetHeight;
      const elemOffset = offset(elem).top;
      const animStart = 8;

      let elemPoint = window.innerHeight - elemHeight / animStart;

      if (elemHeight > window.innerHeight) {
        elemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((scrollY > elemOffset - elemPoint) && (scrollY < elemOffset + elemHeight)) {
        elem.classList.add('animated');
      }
      if (scrollY >= elemOffset + elemHeight) {
        elem.classList.add('animated');
      }
    })
  }
}