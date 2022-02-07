import {Swiper, Navigation, Pagination} from "swiper";

Swiper.use([Navigation, Pagination]);

function externalPageSlider() {
  const container = document.querySelector('#js-external-page-slider');

  if (!container) return;

  new Swiper('#js-external-page-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    speed: 1000,
    // loop: true,
    navigation: {
      nextEl: '.external-page__slider-button-next',
      prevEl: '.external-page__slider-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  })
}

export default externalPageSlider;