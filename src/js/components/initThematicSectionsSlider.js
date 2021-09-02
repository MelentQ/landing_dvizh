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
  })
}

export default initThematicSectionsSlider;