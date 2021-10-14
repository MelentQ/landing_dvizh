import {Swiper} from "swiper";

function initNewsPreviewSlider() {
  const container = document.querySelector('#news-preview');
  if (!container) return;

  new Swiper('.news-preview__slider', {
    slidesPerView: 3,
    spaceBetween: 50,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      769: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1025: {
        slidesPerView: 3
      }
    }
  })
}

export default initNewsPreviewSlider;