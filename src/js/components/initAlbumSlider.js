import Swiper from 'swiper';

export default function initAlbumSlider() {
  const container = document.querySelector('#albumSwiper');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('.swiper-slide'));
  const slidesCount = slides.length;

  // Для корректной работы рассчитываем высоту слайдера
  // Сумма высот трёх карточек
  const spaceBetween = 22;
  const cardHeight = container.querySelector('.album__image-wrapper').clientHeight;
  const containerHeight = cardHeight * 3 + spaceBetween * 2;

  container.style.height = containerHeight + 'px';

  new Swiper('#albumSwiper', {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: spaceBetween,
    mousewheel: true,
    grabCursor: true
  });

  window.addEventListener('resize', () => {
    container.style.removeProperty('height');
    const cardHeight = container.querySelector('.album__image-wrapper').clientHeight;
    const containerHeight = cardHeight * 3 + spaceBetween * 2;

    container.style.height = containerHeight + 'px';
  })

  albumScroll(slidesCount);
}

function albumScroll(slidesCount) {
  const track = document.querySelector('.album-scroll');
  const thumb = track.querySelector('.album-scroll__btn');

  const trackHeight = track.clientHeight;
  const thumbHeight = thumb.clientHeight;

  const toggleSize = track.offsetHeight / slidesCount

  const trackYPosition = track.pageYOffset;

  function mouseDownFunction(e) {
  }

  function mouseMoveFunction(e) {
    const mouseYPosition = e.clientY;

    console.log("mouseYPosition: " + mouseYPosition, "trackYPosition: " + trackYPosition)

    if (mouseYPosition >= trackYPosition && mouseYPosition <= trackYPosition + trackHeight) {
      const diff = mouseYPosition - trackYPosition;
      const percentageDiff = diff/trackHeight * 100;

      thumb.style.top = percentageDiff + "%";
    }
  }

  thumb.addEventListener("mousedown", function(e){
    mouseDownFunction(e); 

    thumb.onmousemove = function(e) {
      mouseMoveFunction(e);
    }
  });

  thumb.addEventListener("mouseout", function(e){
    thumb.onmousemove = null
  });

  function moveThumb(i) {
    const movePosition = toggleSize * i;
    thumb.style.top = movePosition + 'px';
  }
}