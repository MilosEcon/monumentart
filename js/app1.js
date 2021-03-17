window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

const body = document.querySelector("body");
const bulbs = document.querySelectorAll('.bulb');
const bulbArea = document.querySelector('.menu-container');
const navList = document.querySelectorAll(".nav a");
const navCover = CSSRulePlugin.getRule('.menu-container__left .wrapper .nav li a:before');
const waveAfter = CSSRulePlugin.getRule('.intro__padding .wrapper .wave::after');
const menuBtn = document.querySelectorAll(".header__hamburger");
const menuContainer = document.querySelector(".menu-container");
const contacts = document.querySelector(".contacts");
const brief = document.querySelector(".brief");
const hamburgerSmall = document.querySelector(".header__hamburger--small");
const hamburgerBigWrapper = document.querySelector(".header__hamburger-big-wrapper");
const hamburgerBig = document.querySelector(".header__hamburger--big");
const hamburgerBarTop = document.querySelectorAll(".header__hamburger .top");
const hamburgerBarMiddle = document.querySelectorAll(".header__hamburger .middle");
const hamburgerBarBottom = document.querySelectorAll(".header__hamburger .bottom");
const hamburgerLetters = document.querySelector(".header__letters");
const loaderLogoMask = CSSRulePlugin.getRule(".loader__text:after");
const loader = document.querySelector(".loader");
const loaderText = document.querySelector(".loader__text");
const logoHeader = document.querySelector(".header__logo");
const imageContainer = document.querySelector(".image-container");
const imageContainerDiv = document.querySelector(".image-container div");
const socialHeader = document.querySelector(".header__social");
const socialMenu = document.querySelector(".menu-container__social");


//borders
const borderTop = document.querySelector(".borders__top");
const borderRight = document.querySelector(".borders__right");
const borderBottom = document.querySelector(".borders__bottom");
const borderLeft = document.querySelector(".borders__left");

// O and dot in Hello intro animation
const helloO = document.querySelector(".hello-second__o circle");
const helloDot = document.querySelector(".hello-second__dot circle");
const helloDotRadius = helloO.r.baseVal.value;
const helloDotCircumference = helloDotRadius * 2 * Math.PI;
const helloLettersAnimDuration = 0.8;

// set stroke dasharray and offset
helloO.style.strokeDasharray = helloDotCircumference * 2.5;
helloO.style.strokeDashoffset = helloDotCircumference * 2.5;

// brakpoints corresponds those in _break-points.scss
const breakpoints = {
  mediaXs: 360,
  mediaS: 600,
  mediaMd: 768,
  mediaLg: 992,
  mediaXl: 1200,
  mediaXxl: 1600
} 

// variables for open menu animation
let headerLogoTopPosition;
let headerLogoLeftPosition;

// functions

function openMenu() {
  disableScrollOnMenuOpen();
  setVariablesForOpenMenu();
  closeMenuTl.invalidate();
  closeMenuTl.kill();
  openMenuTl.restart();
}

function closeMenu() {
  enableScrollOnMenuClose();
  setVariablesForCloseMenu();
  openMenuTl.invalidate();
  openMenuTl.kill();
  closeMenuTl.restart();
}

function getWindowWidth() {
  return window.innerWidth;
}

function getBreakpointRange() {
  const windowSize = getWindowWidth();
  if(windowSize > breakpoints.mediaXxl) {
    return 'mediaXxl';
  }
  if(breakpoints.mediaXxl >= windowSize && windowSize > breakpoints.mediaXl) {
    return 'mediaXl';
  }
  if(breakpoints.mediaXl >= windowSize && windowSize > breakpoints.mediaLg) {
    return 'mediaLg';
  }
  if(breakpoints.mediaLg >= windowSize && windowSize > breakpoints.mediaMd) {
    return 'mediaMd';
  }
  if(breakpoints.mediaMd >= windowSize && windowSize > breakpoints.mediaS) {
    return 'mediaS';
  }
  if(breakpoints.mediaS >= windowSize) {
    return 'mediaXs';
  }
}

function setHeaderLogo(breakpoint, menuState) {
  if(menuState === 'open') {
    switch(breakpoint) {
      case 'mediaXs':
      case 'mediaS':
        headerLogoTopPosition = 40;
        headerLogoLeftPosition = '10vw';
        break;
      case 'mediaMd': 
        headerLogoTopPosition = 50;
        headerLogoLeftPosition = '16vw';
        break;
      default:
      headerLogoTopPosition = 50;
      headerLogoLeftPosition = '10vw';
    }
  }

  else if(menuState === 'close') {
    switch(breakpoint) {
      case 'mediaXs':
      case 'mediaS':
        headerLogoTopPosition = 40;
        headerLogoLeftPosition = '10vw';
        break;
      case 'mediaMd': 
        headerLogoTopPosition = 10;
        headerLogoLeftPosition = '16vw';
        break;
      default:
      headerLogoTopPosition = 20;
      headerLogoLeftPosition = '10vw';
    }
  }
}

function setVariablesForOpenMenu() {
  const breakpoint = getBreakpointRange();
  setHeaderLogo(breakpoint, 'open');
}

function setVariablesForCloseMenu() {
  const breakpoint = getBreakpointRange();
  setHeaderLogo(breakpoint, 'close');
}

function disableScrollOnMenuOpen() {
  bodyScrollLock.disableBodyScroll(menuContainer);
}

function enableScrollOnMenuClose() {
  bodyScrollLock.enableBodyScroll(menuContainer);
  bodyScrollLock.clearAllBodyScrollLocks();
}

// gsap timelines
const introTl = gsap.timeline();
const openMenuTl = gsap.timeline().pause().addLabel("startLabel");
const closeMenuTl = gsap.timeline().pause().addLabel("startLabel");
const introScrollTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.intro',
    start: "1px top",
    toggleActions: 'play none none reverse'
  }
});

introScrollTL
  .to('.scroll', { bottom: 60, opacity:0, duration: 0.3, ease: Power1.easeInOut})
  .to('.intro__container', { x: '50%', duration: 0.5, ease: Power1.easeInOut}, '-=0.3')
  .to('.intro__page-color', { x: '100%', duration: 0.5, ease: Power2.easeInOut}, '-=0.5')
  .to(waveAfter, { width: '0%', duration: 0.3, ease: Sine.easeIn}, '-=0.2')
  .to('.since', { marginLeft: 20, opacity: 1, duration: 0.3, ease: Sine.easeIn}, '-=0.3')
  .to('.mission-text > div > div', { y: 0, opacity: 1, duration: 0.3, ease: Sine.easeIn}, '-=0.3');

ScrollTrigger.matchMedia({
  "(min-width: 601px)": function() {
   gsap.to(imageContainerDiv, {
      backgroundPosition: `50% ${imageContainer.clientHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
          trigger: imageContainer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
      }, 
    });

  gsap.to('.print-design .image-container div', {
    backgroundPosition: `50% 50%`,
    ease: "none",
    scrollTrigger: {
        trigger: '.print-design .image-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }, 
    });
  
    gsap.to('.logo .image-container div', {
    backgroundPosition: `50% 50%`,
    ease: "none",
    scrollTrigger: {
        trigger: '.logo .image-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }, 
    });
  },

  "(min-width: 769px)": function() {
    gsap.to('.print-design__text', {
      scrollTrigger: {
          trigger: '.print-design__text',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3
      },
      y: 0
    });

    gsap.utils.toArray('.footer .brief, .footer .contacts').forEach((el, i) => {
      gsap.to(el, {
          y:0,
          ease: 'none',
          scrollTrigger: {
              trigger: '.main',
              start: 'bottom bottom',
              end: 'bottom bottom-=250',
              scrub: 0.3,
              markers: true
          }, 
      });
  });
  }
}); 

// Intro animation
introTl
  .to(loaderLogoMask, { duration: 1, ease: Power1.easeOut, cssRule: { width: "0%" } } )
  
  .to(loader, { duration: 0.6, ease: Power1.easeInOut, opacity: 0, x: "-110%" })
  .to(loader, { duration: 0, ease: Power1.easeInOut, x: "0%" })  
  
  .to(loaderText, { duration: 0, ease: Power1.easeInOut, display: "none" })  
  
  .from(borderTop, { duration: 0.3,  clearProps: true, ease: Power2.easeIn, y: '-100%'  }, "-=0.5")
  .from(borderRight, { duration: 0.3,  clearProps: true, ease: Power2.easeIn, x: '100%' }, "-=0.5")
  .from(borderBottom, { duration: 0.3,  clearProps: true, ease: Power2.easeIn, y: '0100%' }, "-=0.5")
  .from(borderLeft, { duration: 0.3,  clearProps: true, ease: Power2.easeIn, x: '-100%' }, "-=0.5")
  
  .from(socialHeader, { duration: 0.3,  clearProps: true, ease: Power2.easeIn, x: 55 }, "-=0.5")
  
  .from(menuContainer, { duration: 0.3, clearProps: true, ease: Power2.easeIn, left: 0 }, "-=0.5")
  
  .from(hamburgerBig, { duration: 0.3, ease: Power2.easeIn, x: -150 }, "-=0.5")
  .from(hamburgerSmall, { duration: 0.5, ease: Power2.ease, y: -200 }, "-=0.5")
  
  .from(logoHeader, { duration: 0.3, ease: Power2.easeIn, clearProps: true, top: -100 }, "-=0.5")
  
  .add("startHello, +=0.5")
  
  .to( ".intro__page-color", { width: "50%", duration: 0.5 }, "startHello-=0.3")
  .to( ".hello-first__h div:first-child", { height: "100%", duration: helloLettersAnimDuration }, "startHello" )
  .to( ".hello-first__h div:nth-child(2)", { width: '23%', duration: helloLettersAnimDuration }, "startHello" )
  .to( ".hello-first__h div:last-child", { width: '10%', duration: helloLettersAnimDuration }, "startHello" )
  .to( ".hello-first__e div:first-child", { height: "100%", duration: helloLettersAnimDuration }, "startHello+=0.1" )
  .to( ".hello-first__e div:nth-child(2)", { width: '23%', duration: helloLettersAnimDuration }, "startHello+=0.1" )
  .to( ".hello-first__e div:nth-child(3)", { height: '25%', duration: helloLettersAnimDuration }, "startHello+=0.1" )
  .to( ".hello-first__e div:last-child", { width: '23%', duration: helloLettersAnimDuration }, "startHello+=0.1" )
  .to( ".hello-second__l:not(.two) div:first-child", { height: "100%", duration: helloLettersAnimDuration }, "startHello" )
  .to( ".hello-second__l div:first-child", { width: '10%', duration: helloLettersAnimDuration }, "startHello" )
  .to( ".hello-second__l div:nth-child(2)", { width: '23%', duration: helloLettersAnimDuration }, "startHello" )
  .to( helloO, { strokeDashoffset: 0, duration: 2 }, "startHello+=0.2" )
  .to( helloDot, { scale: 1, duration: helloLettersAnimDuration }, "startHello+=0.1" );

// open menu animation
openMenuTl
  .to( menuContainer, { x: 0, duration: 0.3, ease: Power2.easeIn }, "startLabel" )
  .to( hamburgerBig, { x: 50, duration: 0.3 }, "startLabel" )
  .to( hamburgerBarTop, { y: 5, width: 20, rotate: 45, duration: 0.1 }, "startLabel" )
  .to( hamburgerBarMiddle, { opacity: 0, duration: 0 }, "startLabel" )
  .to( hamburgerBarBottom, { width: 20, y: -5, rotate: -45, duration: 0.1 }, "startLabel" )
  .to( hamburgerLetters, { opacity: 0, duration: 0.1 }, "startLabel" )
  .to( [borderTop, borderRight, borderLeft, borderBottom], { duration: 0.3, ease: Power2.easeIn, scale: 2 }, "startLabel" )
  .to( logoHeader, { x: () => headerLogoLeftPosition, top: () => headerLogoTopPosition, duration: 0.3, scale: 0.7, ease: Power1.easeIn }, "startLabel" )
  .to( navList, { y: 20, duration: 0.8, ease: Power1.easeOut }, "-=0.15" )
  .to( navCover, { duration: 0.8, ease: Power1.easeOut, cssRule: { height: "0%" } }, "-=0.6" )
  .to( contacts, { y: 0, opacity: 1, duration: 0.6, ease: Power1.easeOut }, "-=0.7" )
  .to( socialMenu, { y: 0, opacity: 1, duration: 0.6, ease: Power1.easeOut }, "-=0.7" )
  .to( brief, { y: 0, opacity: 1, duration: 0.6, ease: Power1.easeOut }, "-=0.6")
  .to( loader, { opacity: 0.7, ease: Power1.easeIn, duration: 0.3 }, "startLabel");

// close Menu animation
closeMenuTl
  .to( menuContainer, { x: "-100%", duration: 0.3, ease: Power2.easeIn }, "startLabel" )
  .to( loader, { opacity: 0, ease: Power2.easeOut, duration: 0.7 }, "startLabel")
  .to( hamburgerBig, { x: 0, duration: 0.3 }, "startLabel")
  .to( hamburgerBarTop, { y: 0, width: "80%", rotate: 0, duration: 0.1 }, "startLabel" )
  .to( hamburgerBarMiddle, { opacity: 1, duration: 0 }, "startLabel")
  .to( hamburgerBarBottom, { width: "60%", y: 0, rotate: 0, duration: 0.1 }, "startLabel" )
  .to( hamburgerLetters, { opacity: 1, duration: 0.1 }, "startLabel")
  .to( [borderTop, borderRight, borderBottom, borderLeft], { duration: 0.3, ease: Power2.easeIn, scale: 1 }, "startLabel")
  .to( brief, { y: -20, opacity: 0, duration: 0.2, ease: Power1.easeOut }, "startLabel" )
  .to( contacts, { y: -20, opacity: 0, duration: 0.2, ease: Power1.easeOut }, "startLabel" )
  .to( socialMenu, { y: -20, opacity: 0, duration: 0.2, ease: Power1.easeOut }, "startLabel" )
  .to( navCover, { duration: 0.2, ease: Power1.easeOut, cssRule: { height: "100%" } } )
  .to( navList, { y: 0, duration: 0.2, ease: Power1.easeOut })
  .to( logoHeader, { x: 0, top: () => headerLogoTopPosition, duration: 0.3, scale: 1, ease: Power1.easeIn, clearProps: 'top' }, "startLabel" );

// Animate bulbs in menu area
bulbArea.addEventListener('mousemove', e => {
  bulbs.forEach(bulb => {
      const speed = bulb.getAttribute('data-speed');
      const x = (window.innerWidth - e.clientX * speed) / 100;
      const y = (window.innerWidth - e.clientY * speed) / 100;
      bulb.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
})

navList.forEach(element => {
  const bulbPath = document.querySelector(`.bulb.${element.dataset.bulb} path`);
  
  element.addEventListener("mouseover", e => {
      bulbPath.classList.add('full-opacity');
  });

  element.addEventListener("mouseout", e => {
      bulbPath.classList.remove('full-opacity');
  })
})

// toggle menu
menuBtn.forEach(menuBtn => {
  menuBtn.addEventListener("click", e => {
    e.preventDefault();
    document.body.classList.toggle("menu-opened");
    document.body.classList.toggle("menu-closed");

    if (body.classList.contains("menu-opened")) {
      openMenu();
    } else {
      closeMenu();
    }
  });
});

