import {Swiper} from "swiper";

function initHotelsSlider() {
  const container = document.querySelector('#hotels-reservation');
  if (!container) return;

  new Swiper('.hotels-reservation__slider', {
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

  // Проставляем звезды
  const slides = container.querySelectorAll('.hotel-card');

  slides.forEach(slide => {
    const ratingElement = slide.querySelector('.rating');
    const stars = ratingElement.dataset.rating;

    const starsElement = Array.from(ratingElement.querySelectorAll('.rating__star'));

    for (let i=0; i<stars; i++) {
      starsElement[i].style.opacity = "1";
    }
  })
}

export default initHotelsSlider;