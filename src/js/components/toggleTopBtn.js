import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Управляет логикой хедера
 * Кастомный position: sticky
 */
 function toggleTopBtn() {
  const topBtn = document.querySelector('.top-btn');
  if (!topBtn) return;

  topBtn.addEventListener('click', (e) => {
    e.preventDefault();
    gsap.to(window, {duration: 1, scrollTo: 0});
  })

  let isOpen = false;

  const toggle = () => {
    const scrollPos = window.pageYOffset;
    const togglePositon = document.documentElement.clientHeight;

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