import { Navigation, Swiper } from 'swiper';

Swiper.use([Navigation]);

export default function aboutPast() {
  const hostElem = document.getElementById('about-past');
  if (!hostElem) return;

  const swiper = new Swiper(hostElem.querySelector('.about-past__slider-container'), {
    slidesPerView: 1,
    spaceBetween: 20,
    resistanceRatio: 0.4,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      769: {
        slidesPerView: 2,
      },
      1025: {
        slidesPerView: 3,
        resistanceRatio: 0
      }
    }
  });

  // Дальше логика работы табов
  const cards = hostElem.querySelectorAll('.about-past__item');
  const descriptions = hostElem.querySelectorAll('.about-past__slide-full');
  const overlays = hostElem.querySelectorAll('.about-past__slide-overlay');
  const contents = hostElem.querySelectorAll('.about-past__slide-full-content');

  const hideAll = () => {
    descriptions.forEach(desc => {
      desc.classList.remove('about-past__slide-full_opened');
    })
    overlays.forEach(overlay => {
      overlay.classList.remove('animated')
    })
    contents.forEach(content => {
      content.classList.remove('visible')
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

  function openDescription(index) {
    descriptions[index].classList.add('about-past__slide-full_opened');
    overlays[index].classList.add('animated');
    contents[index].classList.add('visible');
  }

  cards.forEach((card, i) => {
    const btn = card.querySelector('.about-past__bnt-read-completely');
    const closeBtn = card.querySelector('.about-past__slide-full-close');

    btn.addEventListener('click', () => {
      btn.blur();
      hideAll();
      removeZIndex();
      card.style.zIndex = "10";
      openDescription(i)
    })

    // card.addEventListener('mouseover', () => {
    //   hideAll();
    //   removeZIndex();
    //   card.style.zIndex = "10";
    //   openDescription(i);
    // })

    descriptions[i].addEventListener('mouseleave', () => {
      hideAll();
    })

    closeBtn.addEventListener('click', () => {
      descriptions[i].classList.remove('about-past__slide-full_opened');
    })
  })

  document.addEventListener('click', (evt) => {
    // Клик по оверлею
    if (!evt.target.closest('.about-past__slide-full_opened') && !evt.target.classList.contains('about-past__bnt-read-completely')) {
      hideAll();
    }
  })
}
