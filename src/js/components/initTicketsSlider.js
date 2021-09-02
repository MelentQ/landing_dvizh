import Swiper from "swiper";

/**
 * Включает слайдер на секции "Билеты"
 */
function initTicketsSlider() {
  const container = document.querySelector('.tickets__slider');

  if (!container) return;

  new Swiper('.tickets__slider', {
    slidesPerView: 4,
    spaceBetween: 20,
  })
}

export default initTicketsSlider;