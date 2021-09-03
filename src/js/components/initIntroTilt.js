import VanillaTilt from 'vanilla-tilt';
/**
 * Включает анимацию на блоке Intro
 * Документация: https://github.com/micku7zu/vanilla-tilt.js
 */
function initVanillaTilt() {
  const element = document.querySelector(".intro__title-image");
  VanillaTilt.init(element, {
		max: 8,
		speed: 1000,
    reverse: true
	});
}

export default initVanillaTilt;