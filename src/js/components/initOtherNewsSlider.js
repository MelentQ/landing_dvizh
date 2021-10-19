import {Swiper} from "swiper";

function initOtherNewsSlider() {
  const container = document.querySelector('#other-news');
  if (!container) return;

  if (document.documentElement.offsetWidth <= 1024) {
    new Swiper('.other-news__slider', {
      slidesPerView: 1,
      resistanceRatio: 0.4,
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
          slidesPerView: 3,
          spaceBetween: 50,
          resistanceRatio: 0
        }
      }
    })
  }
}

export default initOtherNewsSlider;