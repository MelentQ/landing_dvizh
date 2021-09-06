import { hide } from "../../../node_modules/dom7/dom7";

/**
 * Включает кнопки "Подробнее" на секции "5 тематических секций"
 */
function setThematicSectionTabs() {
  const container = document.querySelector('.thematic-sections__list');

  if (!container) return;

  const cards = container.querySelectorAll('.thematic-sections__item');
  const descriptions = container.querySelectorAll('.thematic-section__description');

  const hideAll = () => {
    descriptions.forEach(desc => {
      desc.classList.remove('thematic-section__description_opened');
    })
  }

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