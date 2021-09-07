/**
 * Управляет логикой хедера
 * Кастомный position: sticky
 */
 function toggleTopBtn() {
  const topBtn = document.querySelector('.top-btn');
  if (!topBtn) return;

  const introElement = document.querySelector('.intro');

  let isOpen = false;

  const toggle = () => {
    const scrollPos = window.pageYOffset;
    const togglePositon = introElement.clientHeight;

    if (scrollPos >= togglePositon && !isOpen) {
      topBtn.classList.add('visible');
      isOpen = true;
    }
    
    if (scrollPos < togglePositon) {
      topBtn.classList.remove('visible');
      isOpen = false;
    }
  }

  toggle();

  window.addEventListener('scroll', toggle);
  window.addEventListener('resize', toggle);
 }

 export default toggleTopBtn;