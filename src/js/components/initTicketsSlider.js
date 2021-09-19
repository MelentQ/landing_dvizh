import Swiper from "swiper";

/**
 * Включает слайдер на секции "Билеты"
 */
function initTicketsSlider() {
  if (document.documentElement.clientWidth > 1024) return;

  const container = document.querySelector('.tickets__slider');

  if (!container) return;

  new Swiper('.tickets__slider', {
    slidesPerView: 4,
    spaceBetween: 20,
    resistanceRatio: 0.4,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      577: {
        slidesPerView: 2
      },
      769: {
        slidesPerView: 3,
        resistanceRatio: 0
      }
    }
  })

  // Анимация фокуса
  
  // const cards = container.querySelectorAll('.tickets__item');

  // const focus = (index) => {
  //   cards.forEach((card, i) => {
  //     if (index != i) {
  //       card.style.opacity = 0.6;
  //     }
  //     else {
  //       card.style.opacity = 1;
  //     }
  //   })
  // }

  // const unfocusAll = () => {
  //   cards.forEach((card, i) => {
  //     card.style.opacity = 1;
  //   })
  // }

  // cards.forEach((card, i) => {
  //   card.addEventListener('mouseover', () => {
  //     focus(i);
  //   })
  //   card.addEventListener('mouseleave', () => {
  //     unfocusAll();
  //   })
  // })
}

export default initTicketsSlider;