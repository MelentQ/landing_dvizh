import data from './../../results.json'
import initNewsPreviewSlider from './initNewsPreviewSlider';

export default function generateNews() {
  const container = document.querySelector('#news-preview');
  if (!container) return;

  // Найдем количество категорий
  let categories = [];
  data[0].forEach(newsItem => {
    const category = newsItem.category;
    if (!categories.includes(category)) categories.push(category);
  });

  // Создадим массив объектов с карточками
  let cards = [];

  // Генерируем карточки с новостями
  // Для этого получаем шаблон карточки, заполняем данными и рисуем на странице
  const newsContainer = container.querySelector('.news-preview__slider-wrapper');
  data[0].forEach(newsItem => {
    const newsElement = _getTemplate(newsContainer, '#news-card-template');

    const newsLink = newsElement.querySelector('.news-preview-item__wrapper-link');
    newsLink.href = "https://dvizh.ru" + newsItem.link;

    const newsImage = newsElement.querySelector('.news-preview-item__image');
    newsImage.src = newsItem.image;
    // newsImage.src = "img/content/intro-bg-3.jpg" // Для тестов
    newsItem.alt = newsItem.name;

    const newsDate = newsElement.querySelector('.news-preview-item__date');
    newsDate.dateTime = newsItem.dateTime;
    newsDate.textContent = newsItem.date;

    const newsTitle = newsElement.querySelector('.news-preview-item__title');
    newsTitle.textContent = newsItem.name;

    cards.push({
      category: newsItem.category,
      card: newsElement
    })

    newsContainer.append(newsElement);
  });

  initNewsPreviewSlider();

  // Генерируем фильтр
  const filterContainer = container.querySelector('.filter-links');
  const filterLinks = [];

  const allOption = _getTemplate(filterContainer, '#filter-link-template');
  const allOptionLink = allOption.querySelector('.filter-links__link');
  const allOptionLinkValue = "Все"
  allOptionLink.textContent = allOptionLinkValue;
  allOptionLink.classList.add('selected');
  allOptionLink.addEventListener('click', () => {
    window.newsSlider.destroy(true, false);
    renderCards(newsContainer, cards);
    selectFilter(filterLinks, allOptionLinkValue);
  })
  filterLinks.push({
    name: allOptionLinkValue,
    element: allOptionLink
  });
  filterContainer.append(allOption);

  categories.forEach(category => {
    const filterElement = _getTemplate(filterContainer, '#filter-link-template');
    
    const filterBtn = filterElement.querySelector('.filter-links__link');
    filterBtn.textContent = category;
    filterBtn.addEventListener('click', () => {
      window.newsSlider.destroy(true, false);
      renderCards(newsContainer, cards, category);
      selectFilter(filterLinks, category)
    })
    filterLinks.push({
      name: category,
      element: filterBtn
    });

    filterContainer.append(filterElement);
  })
}

/**
 * Получает шаблон элемента
 * @param {Object} container DOM-элемент, контейнер, в котором находится шаблон
 * @param {String} selector CSS-селектор шаблона
 * @returns {Object} DOM-элемент
 */
 function _getTemplate(container = document, selector) {
  return container.querySelector(selector)
    .content
    .children[0]
    .cloneNode(true);
}

function renderCards(container, cards, category) {
  container.innerHTML = "";

  cards.forEach(card => {
    if (card.category === category) {
      container.append(card.card)
    }
    if (!category) {
      container.append(card.card)
    }
  })

  initNewsPreviewSlider();
}

function selectFilter(filters, name) {
  filters.forEach(filter => {
    if (filter.name === name) filter.element.classList.add('selected');
    else filter.element.classList.remove('selected');
  });
}