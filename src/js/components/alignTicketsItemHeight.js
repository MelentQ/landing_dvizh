/**
 * Функция выравнивает строчки внутри билета
 */
export default function alignTicketsItemHeight() {
  const container = document.querySelector('.tickets__slider');
  if (!container) return;

  const lists = Array.from(container.querySelectorAll('.js-ticket-list'));

  let items = new Array(lists.length);

  lists.forEach((list, i) => {
    items[i] = Array.from(list.querySelectorAll('.js-ticket-item'));
  })

  // Определяем самый короткий список.
  // Будем учитывать только эту длину.
  let minLength = Infinity;
  items.forEach(list => {
    if (list.length < minLength) minLength = list.length;
  })

  const align = () => {
    // Проходимся по циклу и построчно выравниваем высоту элемента каждого билета
    for (let i = 0; i < minLength; i++) {
      let maxPointHeight = 0;

      items.forEach(list => {
        // Тут list - это массив пунктов для одного билета,
        // Тогда list[i] - это i-й пункт билета
        // Одна итерация внутри этого forEach проходит по i-m пунктам каждого билета

        list[i].style.height = 'auto';

        if (list[i].clientHeight > maxPointHeight) maxPointHeight = list[i].clientHeight;
      })

      items.forEach(list => {
        list[i].style.height = maxPointHeight + "px";
      })
    }
  }

  align();

  window.addEventListener('resize', align);

  // ====================
  // Анимации

  const animateLine = (index) => {
    items.forEach(list => {
      // Тут list - это массив пунктов для одного билета,
      // Тогда list[i] - это i-й пункт билета
      // Одна итерация внутри этого forEach проходит по i-m пунктам каждого билета
      
      list[index].classList.add('ticket__list-item--accent');
    })
  }

  const hideAll = (index) => {
    items.forEach(list => {
      // Тут list - это массив пунктов для одного билета,
      // Тогда list[i] - это i-й пункт билета
      // Одна итерация внутри этого forEach проходит по i-m пунктам каждого билета
      
      list[index].classList.remove('ticket__list-item--accent');
    })
  }

  for (let i = 0; i < minLength; i++) {

    items.forEach((list, k) => {
      // Тут list - это массив пунктов для одного билета,
      // Тогда list[i] - это i-й пункт билета
      // Одна итерация внутри этого forEach проходит по i-m пунктам каждого билета

      list[i].addEventListener('mouseover', () => {
        animateLine(i);
      });
      list[i].addEventListener('mouseout', () => {
        hideAll(i);
      });
    })
  }
}