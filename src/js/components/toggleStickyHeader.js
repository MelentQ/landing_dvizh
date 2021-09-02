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
    const introHeight = introElement.clientHeight;
    const aboutHeight = aboutElement.clientHeight;
    const stickyHeaderHeight = stickyHeader.clientHeight;
    const togglePositon = introHeight + aboutHeight - stickyHeaderHeight;

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
  window.addEventListener('load', toggle);
  window.addEventListener('resize', toggle);
}

export default toggleStickyHeader;