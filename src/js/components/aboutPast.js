import { Navigation, Swiper } from 'swiper';

Swiper.use([Navigation]);

export default function aboutPast() {
  const hostElem = document.getElementById('about-past');
  if (!hostElem) return;

  new Swiper(hostElem.querySelector('.about-past__slider-wrapper'), {
    slidesPerView: 1,
    spaceBetween: 20,
    mousewheel: true,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      567: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      }
    }
  });

  const cardTextElems = document.querySelectorAll('.about-past__slide-title');
  const btnsReadCompletely = document.querySelectorAll('.about-past__bnt-read-completely');

  cardTextElems.forEach((text, i) => {
    const fullTextHeight = text.clientHeight;
    const visibleText = window.getComputedStyle(text).lineHeight.split('px')[0]  * 4
    if (fullTextHeight > visibleText) {
      text.classList.add('mod-crop')
    } else {
      btnsReadCompletely[i].remove();
    }
  })

  btnsReadCompletely.forEach((btn, i) => {
    btn.onclick = () => {
      if (cardTextElems[i].className.includes('mod-crop')) {
        cardTextElems[i].classList.remove('mod-crop');
        btn.innerText = 'Скрыть';
      } else {
        cardTextElems[i].classList.add('mod-crop');
        btn.innerText = 'Читать полностью';
      }
    }
  })
}
