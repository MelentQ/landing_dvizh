import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import validation from './validation';
import customSelects from './customSelects';
import masks from './masks';
import fileUpload from './fileUpload';
import anchorLinks from './anchorLinks';
import mediaPlayer from './mediaPlayer';
import datepicker from './datepicker';
import accordions from './accordions';
import modals from './modals';

import toggleStickyHeader from './components/toggleStickyHeader';
import initAlbumSlider from './components/initAlbumSlider';
import alignHeights from './components/alignHeights';
import aboutPast from './components/aboutPast';
import initThematicSectionsSlider from './components/initThematicSectionsSlider';
import setThematicSectionTabs from './components/setThematicSectionTabs';
import initTicketsSlider from './components/initTicketsSlider';
import initPromisesSlider from './components/initPromisesSlider';
import initVanillaTilt from './components/initIntroTilt';
import initMarquee from './components/initMarquee';
import submitForm from './components/submitFrom';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    setScrollbarWidth();
    validation();
    customSelects();
    masks();
    fileUpload();
    anchorLinks();
    accordions();
    mediaPlayer();
    modals();
    datepicker();

    aboutPast();
    initThematicSectionsSlider();
    setThematicSectionTabs();
    initTicketsSlider();
    initPromisesSlider();
    initMarquee();

    initVanillaTilt();

    submitForm();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300);

    // toggleStickyHeader(); // Не работает из-за GSAP Wrapper'а
    // initAlbumSlider(); // Включить до лучших времен
    alignHeights('.thematic-sections__list', '.thematic-section__title');
    alignHeights('.speakers__inner', '.speaker__name');
    alignHeights('.tickets__list', '.ticket__title');
    alignHeights('.tickets__list', '.ticket__list');
})
