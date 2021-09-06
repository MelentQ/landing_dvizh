import {Swiper, Autoplay} from "swiper";

Swiper.use([Autoplay]);

function initSponsorsSlider() {
  const container = document.querySelector('.map__slider');

  if (!container) return;

  new Swiper('.map__slider', {
    slidesPerView: 7,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      371: {
        slidesPerView: 3
      },
      577: {
        slidesPerView: 4
      },
      769: {
        slidesPerView: 5
      },
      1025: {
        slidesPerView: 7,
      }
    }
  })
}

export default initSponsorsSlider;