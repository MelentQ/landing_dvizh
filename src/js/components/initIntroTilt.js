import VanillaTilt from 'vanilla-tilt';
/**
 * Включает анимацию на блоке Intro
 * Документация: https://github.com/micku7zu/vanilla-tilt.js
 */
function initVanillaTilt() {
  const intro = document.querySelector(".intro");
  if (intro) {
    const image = intro.querySelector(".intro__title-image");
  
    VanillaTilt.init(image, {
      max: 5,
      speed: 1000,
      reverse: true,
      gyroscope: false,
      "mouse-event-element": intro
    });
  }

  const about = document.querySelector(".about");

  if (about) {
    const image = about.querySelector('.about__title-iamge');

    VanillaTilt.init(image, {
      max: 3,
      speed: 1000,
      reverse: true,
      gyroscope: false,
      "mouse-event-element": about
    });
  }
}

export default initVanillaTilt;