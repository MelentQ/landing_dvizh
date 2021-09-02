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

  cards.forEach((card) => {
    const btn = card.querySelector('.thematic-section__btn');
    const desc = card.querySelector('.thematic-section__description');

    btn.addEventListener('click', () => {
      btn.blur();
      hideAll();
      desc.classList.add('thematic-section__description_opened');
    })
    desc.addEventListener('mouseleave', () => {
      desc.classList.remove('thematic-section__description_opened');
    })
  })
}

export default setThematicSectionTabs;