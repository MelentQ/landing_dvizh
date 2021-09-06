import Swiper from 'swiper';

/**
 * Включает кнопки "Подробнее" на секции "5 тематических секций"
 */
function setThematicSectionTabs() {
  const container = document.querySelector('.thematic-sections__slider');
  if (!container) return;

  const swiper = new Swiper('.thematic-sections__slider', {
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

  const cards = container.querySelectorAll('.thematic-sections__item');
  const descriptions = container.querySelectorAll('.thematic-section__description');

  const hideAll = () => {
    descriptions.forEach(desc => {
      desc.classList.remove('thematic-section__description_opened');
    })
  }

  // Скрываем все табы при свайпе
  swiper.on('slideChange', function () {
    hideAll();
  });

  // Чтобы карточки не накладывались, у активной z-index должен быть больше, чем у остальных.
  // Ниже по коду активной карточке выставляется z-index: 10, остальным z-index: 2
  const removeZIndex = () => {
    cards.forEach(card => {
      card.style.zIndex = "2";
    })
  }

  cards.forEach((card) => {
    const btn = card.querySelector('.thematic-section__btn');
    const desc = card.querySelector('.thematic-section__description');
    const closeBtn = card.querySelector('.thematic-section__description-close');

    btn.addEventListener('click', () => {
      btn.blur();
      hideAll();
      removeZIndex();
      card.style.zIndex = "10";
      desc.classList.add('thematic-section__description_opened');
    })

    closeBtn.addEventListener('click', () => {
      desc.classList.remove('thematic-section__description_opened');
    })
  })

  document.addEventListener('click', (evt) => {
    // Клик по оверлею
    if (!evt.target.closest('.thematic-section__description_opened') && !evt.target.classList.contains('thematic-section__btn')) {
      hideAll();
    }
  })
}

export default setThematicSectionTabs;