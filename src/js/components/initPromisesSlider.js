import Swiper from "swiper";

/**
 * Включает слайдер на секции "Каким будет этот форум"
 */
function initPromisesSlider() {
  const container = document.querySelector('.promises__slider');

  if (!container) return;

  new Swiper('.promises__slider', {
    slidesPerView: 1,
    spaceBetween: 120,
    mousewheel: true,
    breakpoints: {
      320: {
        spaceBetween: 20,
      },
      769: {
        spaceBetween: 40,
      },
      1025: {
        spaceBetween: 120,
      }
    }
  })
}

export default initPromisesSlider;