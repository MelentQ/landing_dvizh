import validation from './validation';

import './components/hystModal';
import toggleStickyHeader from './components/toggleStickyHeader';
import initAlbumSlider from './components/initAlbumSlider';
import alignHeights from './components/alignHeights';
import aboutPast from './components/aboutPast';
import setThematicSectionTabs from './components/setThematicSectionTabs';
import initTicketsSlider from './components/initTicketsSlider';
import initPromisesSlider from './components/initPromisesSlider';
import initVanillaTilt from './components/initIntroTilt';
import initMarquee from './components/initMarquee';
import initSponsorsSlider from './components/initSponsorsSlider';
import openYouTubeModal from './components/openYouTubeModal';
import {timer} from './components/timer';
import smoothScroll from './components/smoothScroll';
import toggleTopBtn from './components/toggleTopBtn';
import toggleBurgerMenu from './components/toggleBurgerMenu';
import animations from './components/animations';
import easyParallax from './components/easyParallax';

document.addEventListener('DOMContentLoaded', function() {
    validation();

    aboutPast();
    setThematicSectionTabs();
    initTicketsSlider();
    initPromisesSlider();
    initMarquee();

    initVanillaTilt();

    initSponsorsSlider();
    openYouTubeModal();

    timer.init('.sticky-header__time');
    smoothScroll();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300);

    toggleStickyHeader();
    toggleTopBtn();
    toggleBurgerMenu();
    initAlbumSlider();
    alignHeights('.thematic-sections__list', '.thematic-section__title');
    alignHeights('.speakers__inner', '.speaker__name');
    alignHeights('.tickets__list', '.ticket__title');
    alignHeights('.tickets__list', '.ticket__list');
    animations();

    easyParallax();
})
