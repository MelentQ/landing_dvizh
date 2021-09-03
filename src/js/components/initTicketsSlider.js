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
    simulateTouch: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        simulateTouch: true
      },
      577: {
        slidesPerView: 2
      },
      769: {
        slidesPerView: 3,
      },
      1025: {
        slidesPerView: 4,
        simulateTouch: false
      }
    }
  })
}

export default initTicketsSlider;