/**
 * Управляет логикой хедера
 * Кастомный position: sticky
 */
function toggleBurgerMenu() {
  const header = document.querySelector('.page-header');
  if (!header) return;

  const btn = header.querySelector('.header__burger');
  if (!btn) return;

  const links = header.querySelectorAll('.header__menu-link');

  btn.addEventListener('click', () => {
    btn.blur();
    header.classList.toggle('mobile');
  })

  links.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('mobile');
    })
  })

  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.page-header') && !evt.target.classList.contains('header__burger')) {
      header.classList.remove('mobile');
    }
  })
}

export default toggleBurgerMenu;