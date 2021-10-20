import data from './../../results.json';
import alignHeights from './alignHeights';

export default function generateNewsPage() {
  const container = document.querySelector('#js-generated-news');
  if (!container) return;

  // Найдём кнопку "Ещё"
  const moreBtn = container.querySelector('.news__more-btn');

  // Найдем количество категорий
  let categories = [];
  data[0].forEach(newsItem => {
    const category = newsItem.category;
    if (!categories.includes(category)) categories.push(category);
  });

  // Создадим массив объектов с карточками
  let cards = [];

  // Переменная с текущей категорией
  let currentCategory;

  // Генерируем карточки с новостями
  // Для этого получаем шаблон карточки, заполняем данными и рисуем на странице
  const newsContainer = container.querySelector('.news__list');
  let initialCount = 0;

  data[0].forEach(newsItem => {
    const newsElement = _getTemplate(newsContainer, '#news-item-template');

    const newsLink = newsElement.querySelector('.news-item__inner');
    newsLink.href = 'https://dvizh.ru' + newsItem.link;

    const newsImage = newsElement.querySelector('.news-item__image');
    newsImage.src = newsItem.image;
    // newsImage.src = "img/content/intro-bg-3.jpg" // Для тестов
    newsItem.alt = newsItem.name;

    const newsDate = newsElement.querySelector('.news-item__date');
    newsDate.dateTime = newsItem.dateTime;
    newsDate.textContent = newsItem.date;

    const newsTitle = newsElement.querySelector('.news-item__title');
    newsTitle.textContent = newsItem.name;

    const newsText = newsElement.querySelector('.news-item__preview-text');
    newsText.textContent = newsItem.text.split('<br />')[0];

    cards.push({
      category: newsItem.category,
      card: newsElement
    });

    initialCount++;

    if (initialCount < 4) newsContainer.append(newsElement);
    else {
      moreBtn.classList.remove('news__more-btn_hidden');
    }
  });

  window.addEventListener('load', function() {
    if (document.documentElement.clientWidth > 768) alignHeights('.news__list', '.news-item');
  });

  // Генерируем фильтр
  const filterContainer = container.querySelector('.filter-links');
  const filterLinks = [];

  const allOption = _getTemplate(filterContainer, '#filter-link-template');
  const allOptionLink = allOption.querySelector('.filter-links__link');
  const allOptionLinkValue = 'Все';
  allOptionLink.textContent = allOptionLinkValue;
  allOptionLink.classList.add('selected');
  allOptionLink.addEventListener('click', () => {
    moreBtn.classList.add('news__more-btn_hidden');
    selectFilter(filterLinks, allOptionLinkValue);
    renderCards(newsContainer, cards, moreBtn);
    if (document.documentElement.clientWidth > 768) alignHeights('.news__list', '.news-item');
  });
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
      moreBtn.classList.add('news__more-btn_hidden');
      selectFilter(filterLinks, category);
      renderCards(newsContainer, cards, moreBtn, category);
      currentCategory = category;
      if (document.documentElement.clientWidth > 768) alignHeights('.news__list', '.news-item');
    });
    filterLinks.push({
      name: category,
      element: filterBtn
    });

    filterContainer.append(filterElement);
  });

  moreBtn.addEventListener('click', () => {
    renderAllCards(newsContainer, cards, currentCategory);
    moreBtn.classList.add('news__more-btn_hidden');
    if (document.documentElement.clientWidth > 768) alignHeights('.news__list', '.news-item');
  });
}

/**
 * Получает шаблон элемента
 * @param {Object} container DOM-элемент, контейнер, в котором находится шаблон
 * @param {String} selector CSS-селектор шаблона
 * @returns {Object} DOM-элемент
 */
function _getTemplate(container = document, selector) {
  return container.querySelector(selector).content.children[0].cloneNode(true);
}

function renderCards(container, cards, moreBtn, category) {
  container.innerHTML = '';

  let cardsCount = 0;

  cards.forEach(card => {
    if (card.category === category) {
      if (cardsCount === 3) {
        moreBtn.classList.remove('news__more-btn_hidden');
        return;
      }
      cardsCount++;
      container.append(card.card);
    }
    if (!category) {
      if (cardsCount === 3) {
        moreBtn.classList.remove('news__more-btn_hidden');
        return;
      }

      cardsCount++;
      container.append(card.card);
    }
  });
}

function renderAllCards(container, cards, category) {
  container.innerHTML = '';

  cards.forEach(card => {
    if (card.category === category) {
      container.append(card.card);
    }
    if (!category) {
      container.append(card.card);
    }
  });
}

function selectFilter(filters, name) {
  filters.forEach(filter => {
    if (filter.name === name) filter.element.classList.add('selected');
    else filter.element.classList.remove('selected');
  });
}
