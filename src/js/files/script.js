
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
    const mainHeader = document.querySelector('.main-header');
    const menuButton = document.querySelector('.main-header__menu .menu__button');
    const menuBody = document.querySelector('.main-header__menu .menu__body');

    let showNavMenu = () => {
        menuButton.setAttribute('aria-expanded', true)
        menuButton.classList.add('menu__button_active');
        menuBody.classList.add('menu__body_open');

        pageBody.classList.add('page__body_lock');
        makeBlocking(mainHeader);
    };

    let hideNavMenu = () => {
        menuButton.setAttribute('aria-expanded', false)
        menuButton.classList.remove('menu__button_active');
        menuBody.classList.remove('menu__body_open');

        pageBody.classList.remove('page__body_lock');
        undoBlocking(mainHeader);
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

const pageHeader = document.querySelector('.page__header');
const pageMain = document.querySelector('.page__main');
const mainHeader = document.querySelector('.main-header');

// Page-main padding 
pageMain.style.paddingTop = `${mainHeader.offsetHeight}px`;

// Header scrolling
let prevScroll = pageYOffset;
window.addEventListener('scroll', () => {
   
    if (pageYOffset > prevScroll) {
        if (pageYOffset > mainHeader.offsetHeight) {
            pageHeader.style.top = `-${mainHeader.offsetHeight}px`;
        }
    }
    else {
        pageHeader.style.top = `-${0}px`;
    }

    prevScroll = pageYOffset;
});