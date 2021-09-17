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

  const touchBtn = scrollContainer.querySelector('.noUi-touch-area');
  touchBtn.innerHTML = '<svg width="15" height="29" viewBox="0 0 15 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="arr-top" d="M13.4042 10.5H1.01941C0.19187 10.5 -0.277547 9.55222 0.223978 8.89397L6.22873 1.01273C6.62156 0.497143 7.39357 0.485777 7.8014 0.989578L14.1815 8.87081C14.7107 9.52463 14.2454 10.5 13.4042 10.5Z" fill="#C4C4C4"/><path id="arr-bottom" d="M1.09645 19L13.4812 19C14.3088 19 14.7782 19.9478 14.2767 20.6061L8.27192 28.4873C7.87909 29.0029 7.10708 29.0142 6.69925 28.5104L0.319201 20.6292C-0.210079 19.9754 0.255249 19 1.09645 19Z" fill="#C4C4C4"/></svg>';

  const downBtn = scrollContainer.querySelector('#arr-bottom');
  const topBtn = scrollContainer.querySelector('#arr-top');

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

  topBtn.addEventListener('click', () => {
    slider.slidePrev(500);
  });

  downBtn.addEventListener('click', () => {
    slider.slideNext(500);
  });
}