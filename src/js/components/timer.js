/**
 * Включает таймер обратного отсчёта в хедере
 * На вход получает data-атрибут с временем
 * Используй дата-атрибут data-time="ДД.ММ.ГГГГ ЧЧ:ММ:СС"
 * @param {String} textSelector - CSS селектор объекта, в котором будет отображаться время
 */
function init(textSelector) {
  const element = document.querySelector(textSelector);
  if (!element) return;

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

    // Получаем секунды
    const seconds = div(diff, 1000) % 60;

    // Получаем минуты
    const minutes = div(diff, 60000) % 60;

    // Получаем часы
    const hours = div(div(diff, 3600000), 24);

    const res = `${hours}:${minutes}:${seconds}`;

    element.textContent = res;
  }, 1000)
}

function div(a, b) {
  return (a - a % b) / b;
};

export const timer = {
  init
}