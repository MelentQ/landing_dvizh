/**
 * Включает таймер обратного отсчёта в хедере
 * На вход получает data-атрибут с временем
 * Используй дата-атрибут data-time="ДД.ММ.ГГГГ ЧЧ:ММ:СС"
 * @param {String} textSelector - CSS селектор объекта, в котором будет отображаться время
 */
function init(textSelector) {
  const element = document.querySelector(textSelector);
  if (!element) return;

  const labelsContainer = document.querySelector('.sticky-header__time-labels');
  const daysLabel = labelsContainer.querySelector('.sticky-header__time-label_days');
  const hoursLabel = labelsContainer.querySelector('.sticky-header__time-label_hours');

  /**
   * Склоняет слово "День"
   * @param {Number} num - номер дня
   * @returns {String} - слово
   */
  function getDaysLabel(num) {
    if (num % 10 === 0 || num % 10 === 5 || num % 10 === 6 || num % 10 === 7 || num % 10 === 8 || num % 10 === 9) {
      return "дней";
    }
    if (num % 10 === 1) {
      return "день";
    }
    if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
      return "дня";
    }
  }

  /**
   * Склоняет слово "Час"
   * @param {Number} num - номер часа
   * @returns {String} - слово
   */
   function getHoursLabel(num) {
    if (num % 100 === 11 || num % 10 === 0 || num % 10 === 5 || num % 10 === 6 || num % 10 === 7 || num % 10 === 8 || num % 10 === 9) {
      return "часов";
    }
    if (num % 10 === 1) {
      return "час";
    }
    if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
      return "часа";
    }
  }

  // Разбираем строку, создаем из нее объект Date
  const stringEndTime = element.dataset.time;

  const date = stringEndTime.split(' ')[0];
  const time = stringEndTime.split(' ')[1];

  const year = +date.split('.')[2];
  const month = +date.split('.')[1];
  const day = +date.split('.')[0];

  const hour = +time.split(':')[0];
  const min = +time.split(':')[1];
  const sec = +time.split(':')[2];

  const endTime = new Date(year, month - 1, day, hour, min, sec);

  const timer = setInterval(function () {
    const now = new Date();

    const diff = endTime - now;

    if (diff <= 0) {
      clearInterval(timer);

      element.textContent = "00:00:00";
    }

    // Получаем минуты
    let minutes = div(diff, 60000) % 60;
    if (minutes < 10) minutes = "0" + minutes;

    // Получаем часы
    let hours = div(diff, 3600000) % 24;
    if (hours < 10) hours = "0" + hours;
    hoursLabel.textContent = getHoursLabel(hours);

    // Получаем дни
    let days = div(div(diff, 3600000), 24);
    if (days < 10) days = "0" + days;
    daysLabel.textContent = getDaysLabel(days);

    const res = `${days}:${hours}:${minutes}`;

    element.textContent = res;
  }, 1000)
}

function div(a, b) {
  return (a - a % b) / b;
};

export const timer = {
  init
}