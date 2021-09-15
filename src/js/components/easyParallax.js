export default function easyParallax() {
  const intro = document.querySelector('.intro');
  if (!intro) return;
  const about = document.querySelector('.about');
  if (!about) return;

  const rock = about.querySelector('.about__bg-iamge');

  window.addEventListener('scroll', () => {
    const triggerPos = intro.clientHeight + about.clientHeight - (document.documentElement.clientHeight / 1);

    if (scrollY >= triggerPos && (scrollY < intro.clientHeight + about.clientHeight)) {
      const coeff = 0.07; 
      const offset = scrollY - triggerPos;
      rock.style.opacity = "1";
      rock.style.transform = `translateY(${offset * coeff}px)`;
    }
    else if (scrollY < triggerPos) {
      rock.style.opacity = "1";
      rock.style.transform = "translateY(0)";
    }
    else {
      rock.style.opacity = "0";
    }
  })
}