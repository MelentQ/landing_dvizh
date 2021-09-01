import Swiper from 'swiper';

export default function initAlbumSlider() {
  const container = document.querySelector('#albumSwiper');
  if (!container) return;

  // Для корректной работы рассчитываем высоту слайдера
  // Сумма высот трёх карточек
  const spaceBetween = 22;
  const cardHeight = container.querySelector('.swiper-slide').clientHeight;
  const containerHeight = cardHeight * 3 + spaceBetween * 2;

  new Swiper('#albumSwiper', {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: spaceBetween,
    mousewheel: true,
    grabCursor: true,
    autoHeight: true
  });

  container.style.height = containerHeight + 'px';
}