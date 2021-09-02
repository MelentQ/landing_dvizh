/**
 * Управляет логикой появления второго хедера после скролла интро блока
 */
function toggleStickyHeader() {
  const stickyHeader = document.querySelector('.sticky-header');
  if (!stickyHeader) return;

  const introElement = document.querySelector('.intro');

  let isOpen = false;

  const toggle = () => {
    const introHeight = introElement.clientHeight;
    const scrollPos = window.pageYOffset;

    if (scrollPos >= introHeight && !isOpen) {
      stickyHeader.classList.add('sticky-header_opened');
      isOpen = true;
    }
    
    if (scrollPos < introHeight) {
      stickyHeader.classList.remove('sticky-header_opened');
      isOpen = false;
    }
  }

  toggle();

  window.addEventListener('scroll', toggle);
  window.addEventListener('load', toggle);
  window.addEventListener('resize', toggle);
}

export default toggleStickyHeader;