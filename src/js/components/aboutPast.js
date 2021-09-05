import { Navigation, Swiper } from 'swiper';

Swiper.use([Navigation]);

export default function aboutPast() {
  const hostElem = document.getElementById('about-past');
  if (!hostElem) return;

  new Swiper(hostElem.querySelector('.about-past__slider-container'), {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      769: {
        slidesPerView: 2
      },
      1025: {
        slidesPerView: 3
      }
    }
  });

  const cardTextElems = document.querySelectorAll('.about-past__slide-title');
  const btnsReadCompletely = document.querySelectorAll('.about-past__bnt-read-completely');

  // Здесь будем собирать только обрезанные тексты
  const croppedElems = [];
  const realBtn = [];

  cardTextElems.forEach((text, i) => {
    const fullTextHeight = text.clientHeight;
    const visibleText = window.getComputedStyle(text).lineHeight.split('px')[0]  * 4
    if (fullTextHeight > visibleText) {
      text.classList.add('mod-crop');
      croppedElems.push(text);
      realBtn.push(btnsReadCompletely[i]);
    } else {
      btnsReadCompletely[i].remove();
    }
  })

  /**
   * Скрывает все раскрытые элементы
   */
  const hideAll = () => {
    croppedElems.forEach(elem => {
      elem.classList.add('mod-crop');
    })
    realBtn.forEach(btn => {
      btn.innerText = 'Читать полностью';
    })
  }

  btnsReadCompletely.forEach((btn, i) => {
    btn.onclick = () => {
      if (cardTextElems[i].className.includes('mod-crop')) {
        // Скрываем все открытые
        hideAll();
        cardTextElems[i].classList.remove('mod-crop');
        btn.innerText = 'Скрыть';
      } else {
        cardTextElems[i].classList.add('mod-crop');
        btn.innerText = 'Читать полностью';
      }
    }
  })
}
