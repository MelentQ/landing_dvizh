import { Navigation, Swiper } from 'swiper';

Swiper.use([Navigation]);

export default function aboutPast() {
  const hostElem = document.getElementById('about-past');
  if (!hostElem) return;

  const swiper = new Swiper(hostElem.querySelector('.about-past__slider-container'), {
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

  // Дальше логика работы табов
  const cards = hostElem.querySelectorAll('.about-past__item');
  const descriptions = hostElem.querySelectorAll('.about-past__slide-full');

  const hideAll = () => {
    descriptions.forEach(desc => {
      desc.classList.remove('about-past__slide-full_opened');
    })
  }

  // Скрываем все табы при свайпе
  swiper.on('slideChange', function () {
    hideAll();
  });

  // Чтобы карточки не накладывались, у активной z-index должен быть больше, чем у остальных.
  // Ниже по коду активной карточке выставляется z-index: 10, остальным z-index: 2
  const removeZIndex = () => {
    cards.forEach(card => {
      card.style.zIndex = "2";
    })
  }

  cards.forEach((card) => {
    const btn = card.querySelector('.about-past__bnt-read-completely');
    const desc = card.querySelector('.about-past__slide-full');
    const closeBtn = card.querySelector('.about-past__slide-full-close');

    btn.addEventListener('click', () => {
      btn.blur();
      hideAll();
      removeZIndex();
      card.style.zIndex = "10";
      desc.classList.add('about-past__slide-full_opened');
    })

    closeBtn.addEventListener('click', () => {
      desc.classList.remove('about-past__slide-full_opened');
    })
  })

  document.addEventListener('click', (evt) => {
    // Клик по оверлею
    if (!evt.target.closest('.about-past__slide-full_opened') && !evt.target.classList.contains('about-past__bnt-read-completely')) {
      hideAll();
    }
  })
}
