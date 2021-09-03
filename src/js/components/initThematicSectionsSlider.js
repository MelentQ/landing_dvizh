import Swiper from "swiper";

/**
 * Включает слайдер на "Тематических секциях"
 */
function initThematicSectionsSlider() {
  const container = document.querySelector('.thematic-sections__slider');

  if (!container) return;

  new Swiper('.thematic-sections__slider', {
    slidesPerView: 5,
    spaceBetween: 15,
    simulateTouch: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        simulateTouch: true
      },
      371: {
        slidesPerView: 2
      },
      577: {
        slidesPerView: 3
      },
      769: {
        slidesPerView: 4
      },
      1025: {
        slidesPerView: 5,
        simulateTouch: false
      }
    }
  })
}

export default initThematicSectionsSlider;