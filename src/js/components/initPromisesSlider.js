import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import imagesLoaded from 'imagesloaded';

function initPromisesSlider() {
  const hostElem = document.getElementById('promises-host');
  if (!hostElem) return;

  const listItemElems = Array.from(hostElem.querySelectorAll('.promises__list-item'));
  if (listItemElems.length <= 1) return;

  const pageMain = document.querySelector('.page-main');

  // создание обертки для секций
  const createNewWrapperGsap = () => {
    const newWrapperGsap = document.createElement('div');
    newWrapperGsap.classList.add('new-wrapper-gsap');
    const sectionsElems = document.querySelectorAll('section');

    let isAchievingCurrentSection = false;
    sectionsElems.forEach(sectionItem => {
      if (!isAchievingCurrentSection) {
        newWrapperGsap.appendChild(sectionItem);
        isAchievingCurrentSection = sectionItem === hostElem;
      }
    })
    pageMain.prepend(newWrapperGsap);
  }

  // инициализация gsap
  const initGsap = () => {
    const horizontalSections = gsap.utils.toArray('.gsap__slider-container')
    horizontalSections.forEach(sec => {
      const thisPinWrap = sec.querySelector('.gsap__wrapper');
      const thisAnimWrap = thisPinWrap.querySelector('.gsap__list');

      const getToValue = () => {
        const margin = parseFloat(window.getComputedStyle(listItemElems[0]).getPropertyValue("margin-right"));
        const totalElementsWidth = listItemElems.reduce((acc, currentElement) => acc + currentElement.offsetWidth, 0);
        const totalWidth = (totalElementsWidth + margin * (listItemElems.length - 1)) * -1;

        return totalWidth + listItemElems[0].offsetWidth;
      }

      const settings = {
        xPercent: -100 * (listItemElems.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".container",
          pin: true,
          scrub: 1,
          snap: directionalSnap(1 / (listItemElems.length - 1)),
          // base vertical scrolling on how wide the container is so it feels more natural.
          end: "+=3500"
        }
      }

      gsap.to(thisAnimWrap, {
        xPercent: -100 * (listItemElems.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: document.querySelector('.promises__container'),
          start: "bottom bottom",
          end: () => "+=" + thisAnimWrap.scrollWidth,
          pin: document.querySelector('.new-wrapper-gsap'),
          pinSpacing: true,
          invalidateOnRefresh: true,
          scrub: true,
          // snap: directionalSnap(1 / (listItemElems.length - 1)),
        }
      });

      // helper function for causing the sections to always snap in the direction of the scroll (next section) rather than whichever section is "closest" when scrolling stops.
      function directionalSnap(increment) {
        let snapFunc = gsap.utils.snap(increment);
        return (raw, self) => {
          let n = snapFunc(raw);
          return Math.abs(n - raw) < 1e-4 || (n < raw) === self.direction < 0 ? n : self.direction < 0 ? n - increment : n + increment;
        };
      }
    });
  }

  const imgLoad = imagesLoaded(pageMain);

  imgLoad.on('always', () => {
    createNewWrapperGsap();
    initGsap();
  });
}

export default initPromisesSlider;
