import Swiper from 'swiper';

export default function initAlbumSlider() {
  const container = document.querySelector('#albumSwiper');
  if (!container) return;

  // Для корректной работы рассчитываем высоту слайдера
  // Сумма высот трёх карточек
  const spaceBetween = 22;
  const cardHeight = container.querySelector('.album__image-wrapper').clientHeight;
  const containerHeight = cardHeight * 3 + spaceBetween * 2;

  new Swiper('#albumSwiper', {
    direction: "vertical",
    slidesPerView: 3,
    freeMode: {
      enabled: true,
      sticky: true,
    },
    spaceBetween: spaceBetween,
    mousewheel: true,
    grabCursor: true
  });

  container.style.height = containerHeight + 'px';

  window.addEventListener('resize', () => {
    container.style.removeProperty('height');
    const cardHeight = container.querySelector('.album__image-wrapper').clientHeight;
    const containerHeight = cardHeight * 3 + spaceBetween * 2;

    container.style.height = containerHeight + 'px';
  })
}