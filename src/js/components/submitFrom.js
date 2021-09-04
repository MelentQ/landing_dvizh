import hystModal from './hystModal';

/**
 * Открывает модалку после отправки формы
 */
function submitForm() {
  const form = document.forms['reservation'];
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    form.reset();
    hystModal.open('#formModal');
  })
}

export default submitForm;