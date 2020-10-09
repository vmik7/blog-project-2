
// Blocking Elements functons

function makeBlocking(element) {
    document.$blockingElements.push(element);
}
function undoBlocking(element) {
    document.$blockingElements.remove(element);
}




// Burger interactive

if (window.matchMedia('(max-width: 768px)').matches) {
    const pageBody = document.querySelector('.page__body');
    const mainTopHeader = document.querySelector('.main-top-header');
    const menuButton = document.querySelector('.main-top-header__menu .menu__button');
    const menuBody = document.querySelector('.main-top-header__menu .menu__body');

    let showNavMenu = () => {
        menuButton.setAttribute('aria-expanded', true)
        menuButton.classList.add('menu__button_active');
        menuBody.classList.add('menu__body_open');

        pageBody.classList.add('page__body_lock');
        makeBlocking(mainTopHeader);
    };

    let hideNavMenu = () => {
        menuButton.setAttribute('aria-expanded', false)
        menuButton.classList.remove('menu__button_active');
        menuBody.classList.remove('menu__body_open');

        pageBody.classList.remove('page__body_lock');
        undoBlocking(mainTopHeader);
    };
    
    menuButton.addEventListener('click', () => {
        let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;

        if (!expanded) {
            showNavMenu();
        }
        else {
            hideNavMenu();
        }
    });

    hideNavMenu();
}




// Page interactive (menu, fixed header, ...)

const pageTopHeader = document.querySelector('.page__top-header');
const pageMain = document.querySelector('.page__main');
const mainTopHeader = document.querySelector('.main-top-header');

// Page-main padding 
pageMain.style.paddingTop = `${mainTopHeader.offsetHeight}px`;

// Header scrolling
let prevScroll = pageYOffset;
window.addEventListener('scroll', () => {
   
    if (pageYOffset > prevScroll) {
        if (pageYOffset > mainTopHeader.offsetHeight) {
            pageTopHeader.style.top = `-${mainTopHeader.offsetHeight}px`;
        }
    }
    else {
        pageTopHeader.style.top = `-${0}px`;
    }

    prevScroll = pageYOffset;
});