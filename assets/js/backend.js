document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms['reservation'];
  if (!form) return;

  const submitBtn = form.querySelector('.ticket-reservation__form-submit-btn');
  // Отключить кнопку после клика
  submitBtn.setAttribute('disabled', 'true');
  submitBtn.classList.add('form__submit-btn_disabled');
  // Включить кнопку после успешного сабмита
  submitBtn.removeAttribute('disabled');
  submitBtn.classList.remove('form__submit-btn_disabled');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    window.hystModal.open('#formModal');
  })

  // Кнопки фильтра новостей на главной странице
  const links = document.querySelectorAll('.filter-links__link');
  if (links) {
    links.forEach((link, i) => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // !!!

        link.classList.add('selected');

        links.forEach((link, j) => {
          if (j === i) return;
          link.classList.remove('selected');
        })
      })
    })
  }
});