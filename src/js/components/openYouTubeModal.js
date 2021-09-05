import hystModal from './hystModal';

/**
 * Логика работы открытия модалки с видео на клик по видео в галереи
 * Блок "album"
 * Нужно задать класс album__video
 */
function openYouTubeModal() {
  const modal = document.querySelector('#videoModal');
  if (!modal) return;

  const container = document.querySelector('.album');
  if (!container) return;

  const videoItems = container.querySelectorAll('.album__video');
  if (!videoItems) return;

  const iframe = modal.querySelector('.video-modal__iframe');

  videoItems.forEach(videoElement => {
    const openBtn = videoElement.querySelector('.album__open-btn');
    const src = videoElement.dataset.src;

    openBtn.addEventListener('click', () => {
      hystModal.open('#videoModal');
      iframe.src = src;
    })
  })
}

export default openYouTubeModal;