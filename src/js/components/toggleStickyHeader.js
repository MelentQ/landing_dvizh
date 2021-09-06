/**
 * Управляет логикой хедера
 * Кастомный position: sticky
 */
function toggleStickyHeader() {
  const stickyHeader = document.querySelector('.sticky-header');
  if (!stickyHeader) return;

  const introElement = document.querySelector('.intro');
  const aboutElement = document.querySelector('.about');

  let isOpen = false;

  const toggle = () => {
    // Непонятная логика:
    // Программно позиционируем хедер между двумя блоками.
    // Это нельзя сделать с помощью CSS, т.к. мешает обертка GSAP.
    // Делаем это через margin-bottom для секции и абсолютного позиционирования для хедера.
    const introHeight = introElement.clientHeight;
    const aboutHeight = aboutElement.clientHeight;
    const stickyHeaderHeight = stickyHeader.clientHeight;
    const togglePositon = introHeight + aboutHeight;

    // Задаем секции margin-bottom, равный высоте хедера
    aboutElement.style.marginBottom = stickyHeaderHeight + 'px';
    stickyHeader.style.top = togglePositon + 'px';

    const scrollPos = window.pageYOffset;

    if (scrollPos >= togglePositon && !isOpen) {
      stickyHeader.classList.add('sticky-header_fixed');
      isOpen = true;
    }
    
    if (scrollPos < togglePositon) {
      stickyHeader.classList.remove('sticky-header_fixed');
      isOpen = false;
    }
  }

  toggle();

  window.addEventListener('scroll', toggle);
  window.addEventListener('resize', toggle);
}

export default toggleStickyHeader;