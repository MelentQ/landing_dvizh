import {Swiper, Navigation} from "swiper";
import noUiSlider from 'nouislider';

Swiper.use([Navigation]);

function initHotelsSlider() {
  const container = document.querySelector('#hotels-reservation');
  if (!container) return;

  //Определяем ширину экрана
  const windowWidth = document.documentElement.clientWidth;
  let slidesPerView = 1.2;
  if (windowWidth >= 768) slidesPerView = 2.2;
  if (windowWidth >= 1024) slidesPerView = 3.5;

  const slides = container.querySelectorAll('.hotel-card');

  // Настройки noUiSlider
  // const scrollContainer = container.querySelector('.slider__scroll');
  // let customScroll = noUiSlider.create(scrollContainer, {
  //   start: 0,
  //   range: {
  //     'min': 0,
  //     'max': slides.length - slidesPerView
  //   },
  //   step: 1
  // });

  // const touchBtn = scrollContainer.querySelector('.noUi-touch-area');
  // touchBtn.innerHTML = '<svg width="29" height="15" viewBox="0 0 29 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="arr-right" d="M18.7311 13.4042L18.7311 1.01941C18.7311 0.19187 19.6789 -0.277547 20.3371 0.223978L28.2183 6.22873C28.7339 6.62156 28.7453 7.39357 28.2415 7.8014L20.3603 14.1815C19.7065 14.7107 18.7311 14.2454 18.7311 13.4042Z" fill="#C4C4C4"/><path id="arr-left" d="M10.2311 1.09645L10.2311 13.4812C10.2311 14.3088 9.28328 14.7782 8.62503 14.2767L0.743793 8.27192C0.228204 7.87909 0.216839 7.10708 0.720638 6.69925L8.60187 0.3192C9.25569 -0.21008 10.2311 0.255249 10.2311 1.09645Z" fill="#C4C4C4"/></svg>';

  // const leftBtn = scrollContainer.querySelector('#arr-left');
  // const rightBtn = scrollContainer.querySelector('#arr-right');

  const slider = new Swiper('.hotels-reservation__slider', {
    slidesPerView: slidesPerView,
    navigation: {
      nextEl: '.hotels-reservation__slider-btn--next',
      prevEl: '.hotels-reservation__slider-btn--prev',
    },
    breakpoints: {
      320: {
        spaceBetween: 20
      },
      769: {
        spaceBetween: 30
      },
      1025: {
        spaceBetween: 50
      }
    }
  })

  // Связываем noUiSlider и Swiper
  // customScroll.on('change', (values) => {
  //   slider.slideTo(Math.round(values))
  // })

  // А теперь связываем Swiper с noUiSlider
  // slider.on('slideChange', (swiper) => {
  //   customScroll.set(swiper.realIndex);
  // });

  // leftBtn.addEventListener('click', () => {
  //   slider.slidePrev(500);
  // });

  // rightBtn.addEventListener('click', () => {
  //   slider.slideNext(500);
  // });

  // Проставляем звезды
  slides.forEach(slide => {
    const ratingElement = slide.querySelector('.rating');
    const stars = ratingElement.dataset.rating;

    const starsElement = Array.from(ratingElement.querySelectorAll('.rating__star'));

    for (let i=0; i<stars; i++) {
      starsElement[i].style.opacity = "1";
    }
  })
}

export default initHotelsSlider;