import {Swiper, Mousewheel} from 'swiper';
import noUiSlider from 'nouislider';

Swiper.use([Mousewheel]);

export default function initAlbumSlider() {
  const container = document.querySelector('#albumSwiper');
  if (!container) return;

  // Стартовый слайдер считывается из data-атрибута
  const startSliderIndex = +container.dataset.start || 0;

  const slides = Array.from(container.querySelectorAll('.swiper-slide'));
  const slidesCount = slides.length;

  // Настройки noUiSlider
  const scrollContainer = document.querySelector('.album-scroll');
  let customScroll = noUiSlider.create(scrollContainer, {
    orientation: "vertical",
    start: startSliderIndex,
    range: {
      'min': 0,
      'max': slidesCount - 3
    },
    step: 1
  });

  // Для корректной работы рассчитываем высоту слайдера
  // Сумма высот трёх карточек
  const spaceBetween = 22;
  const cardHeight = container.querySelector('.album__image-wrapper').clientHeight;
  const containerHeight = cardHeight * 3 + spaceBetween * 2;

  container.style.height = containerHeight + 'px';

  const slider = new Swiper(container, {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: spaceBetween,
    allowTouchMove: false,
    simulateTouch: false,
    mousewheel: true,
    initialSlide: startSliderIndex,
  });

  window.addEventListener('resize', () => {
    container.style.removeProperty('height');
    const cardHeight = container.querySelector('.album__image-wrapper').clientHeight;
    const containerHeight = cardHeight * 3 + spaceBetween * 2;

    container.style.height = containerHeight + 'px';
  })

  // Связываем noUiSlider и Swiper
  customScroll.on('change', (values) => {
    slider.slideTo(Math.round(values))
  })

  // А теперь связываем Swiper с noUiSlider
  slider.on('slideChange', (swiper) => {
    customScroll.set(swiper.realIndex);
  });
}