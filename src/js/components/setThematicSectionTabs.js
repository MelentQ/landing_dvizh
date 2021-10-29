import { over } from 'lodash';
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
    resistanceRatio: 0.4,
    breakpoints: {
      320: {
        slidesPerView: 1,
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
        resistanceRatio: 0
      }
    }
  })

  const cards = container.querySelectorAll('.thematic-sections__item');
  const descriptions = container.querySelectorAll('.thematic-section__description');
  const overlays = container.querySelectorAll('.thematic-section__description-overlay');
  const contents = container.querySelectorAll('.thematic-section__description-content');

  const hideAll = () => {
    descriptions.forEach(desc => {
      desc.classList.remove('thematic-section__description_opened');
    })
    overlays.forEach(overlay => {
      overlay.classList.remove('animated')
    })
    contents.forEach(content => {
      content.classList.remove('visible')
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

  function openDescription(index) {
    descriptions[index].classList.add('thematic-section__description_opened');
    overlays[index].classList.add('animated');
    contents[index].classList.add('visible');
  }

  cards.forEach((card, i) => {
    const btn = card.querySelector('.thematic-section__btn');
    const closeBtn = card.querySelector('.thematic-section__description-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        descriptions[i].classList.remove('thematic-section__description_opened');
      })
    }

    btn.addEventListener('click', () => {
      btn.blur();
      hideAll();
      removeZIndex();
      card.style.zIndex = "10";
      openDescription(i);
    })

    card.addEventListener('mouseover', () => {
      hideAll();
      removeZIndex();
      card.style.zIndex = "10";
      openDescription(i);
    })

    descriptions[i].addEventListener('mouseleave', () => {
      hideAll();
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